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
  validationButtonDisabled: boolean = true;
  updateButtonDisabled: boolean = true;
  updatedSuccessfully: boolean = false;
  incidentValidationStatus: boolean = false;
  footerMessage: string = null;
  footerMessageType: string = "none";

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
    this.validationButtonDisabled = this.incidentValidationStatus || this.incidentInfo.validationResults.every(x => x.value==x.oldValue);
    this.updateButtonDisabled = !this.incidentValidationStatus || this.updatedSuccessfully;
  }

  setIncidentInfo(payload){
    if (payload && payload.validationResults && payload.validationResults.length>0){
      payload.validationResults.forEach(x => {
        x["oldValue"] = x.value;
      });
    }
    this.incidentInfo = payload;
  }

  getIncidentData() {
    this._incidentAssistanceService.getIncident(this.incidentId).subscribe(res => {
      var result = JSON.parse(res.body.result);
      this.pageLoading = false;
      this.setIncidentInfo(result);
      this.incidentValidationStatus = result.validationResults.every(x => x.validationStatus);
      if (!this.incidentValidationStatus){
        this.footerMessage = "Some validations have failed. Please correct the info and click on 'Check Validation' button.";
        this.footerMessageType = "error";
      }
      console.log("IncidentInfo", this.incidentInfo);
    });
  }

  onSubmit() {
    var body = {
      "IncidentId": this.incidentInfo.incidentId,
      "ValidationResults": this.incidentInfo.validationResults.map(x => {return {Name: x.name, Value: x.value};})
    };
    this._incidentAssistanceService.validateIncident(body).subscribe(res => {
      var result = JSON.parse(res.body.result);
      if (result.validationStatus) {
        this.incidentValidationStatus = true;
        this.footerMessage = "All validations have passed.";
        this.footerMessageType = "success";
        this.incidentInfo.validationResults.forEach(x => {x.validationStatus = true; x.oldValue = x.value;});
        this.refreshButtonStatus();
      }
      else {
        this.incidentValidationStatus = false;
        this.footerMessage = "Some validations have failed. Please try again.";
        this.footerMessageType = "error";
        this.setIncidentInfo(result);
        this.refreshButtonStatus();
      }
    });
  }

  onUpdateClick() {
    var body = {
      "IncidentId": this.incidentInfo.incidentId,
      "ValidationResults": this.incidentInfo.validationResults.map(x => {return {Name: x.name, Value: x.value};})
    };
    this._incidentAssistanceService.updateIncident(body).subscribe(res => {
      var result = JSON.parse(res.body.result);
      if (result.updationStatus) {
        this.updatedSuccessfully = true;
        this.updateButtonDisabled = true;
        this.footerMessage = "Incident has been updated successfully and will be investigated by the team."
        this.footerMessageType = "success";
      }
      else {
        this.updatedSuccessfully = false;
        this.footerMessage = "Incident updation has failed. Please try again.";
        this.footerMessageType = "error";
        //SHOW UPDATION ERROR MESSAGE
      }
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
  updationStatus: boolean;
  errorMessage: string;
  successMessage: string;
}