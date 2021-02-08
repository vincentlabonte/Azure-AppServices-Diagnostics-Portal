import { Component, OnInit } from '@angular/core';
import { FabButtonModule } from '@angular-react/fabric';
import {IncidentAssistanceService} from '../../services/incident-assistance.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'incidentvalidation',
  templateUrl: './incidentvalidation.component.html',
  styleUrls: ['./incidentvalidation.component.scss']
})
export class IncidentValidationComponent implements OnInit {
  pageLoading: boolean= true;
  isEnabled: boolean = false;
  incidentId: string = null;
  incidentInfo: IncidentInfo;
  buttonDisabled: boolean = true;
  validationUpdateResponse: ValidationUpdateResponse;

  constructor(private _incidentAssistanceService: IncidentAssistanceService, private _route: ActivatedRoute, private _router: Router) {}

  ngOnInit() {
    this.incidentId = this._route.snapshot.params['incidentId'];
    if (this.incidentId && this.incidentId.length>0){
      this.pageLoading = true;
      this._incidentAssistanceService.isIncidentAssistanceEnabled().subscribe((res) => {
        this.isEnabled = res.body;
        console.log("IsEnabled:", this.isEnabled);
        if (this.isEnabled) {
          this.getIncidentData();
        }
        else{
          this.pageLoading = false;
        }
      });
    }
    else{
      //INVALID INPUT INCIDENT ID SHOW ERROR MESSAGE
    }
  }

  refreshButtonStatus() {
    this.buttonDisabled = this.incidentInfo.validationResults.every(x => x.value==x.oldValue);
  }

  setIncidentInfo(payload){
    payload.validationResults.forEach(x => {
      x["oldValue"] = x.value;
    });
    this.incidentInfo = payload;
  }

  getIncidentData() {
    this._incidentAssistanceService.getIncident(this.incidentId).subscribe(res => {
      var result = JSON.parse(res.body.result);
      this.setIncidentInfo(result);
      console.log("IncidentInfo", this.incidentInfo);
      this.pageLoading = false;
    });
  }

  onSubmit() {
    console.log(this.incidentInfo);
    var body = {
      "IncidentId": this.incidentInfo.incidentId,
      "ValidationResults": this.incidentInfo.validationResults.map(x => {return {Name: x.name, Value: x.value};})
    };
    this._incidentAssistanceService.validateAndUpdateIncident(body).subscribe(res => {
      console.log("Validation update response1", res);
      var result = JSON.parse(res.body.result);
      if (result.validationStatus) {
        this.validationUpdateResponse = result;
        this.incidentInfo.validationResults.forEach(x => {x.validationStatus=true;});
      }
      else {
        this.setIncidentInfo(result);
        this.refreshButtonStatus();
        this.validationUpdateResponse = result;
      }
      console.log("Validation update response", this.validationUpdateResponse);
    });
  }
}

interface IncidentInfo{
  incidentId: string;
  title: string;
  validationResults: ValidationResult[];
}

interface ValidationResult{
  name: string;
  value: string;
  oldValue: string;
  validationStatus: boolean;
  validationMessage: string;
}

interface ValidationUpdateResponse extends IncidentInfo{
  validationStatus: boolean;
  errorMessage: string;
  successMessage: string;
}