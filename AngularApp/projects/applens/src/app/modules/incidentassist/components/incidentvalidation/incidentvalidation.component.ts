import { Component, OnInit } from '@angular/core';
import { FabButtonModule } from '@angular-react/fabric';

@Component({
  selector: 'incidentvalidation',
  templateUrl: './incidentvalidation.component.html',
  styleUrls: ['./incidentvalidation.component.scss']
})
export class IncidentValidationComponent implements OnInit {
  fields: any[] = [
    {
      fieldName: "What is the name of the site.",
      fieldValue: "baggymakery",
      validationStatus: false,
      validationMessage: "The site with name 'baggymakery' does not exist"
    },
    {
      fieldName: "Impact start time in UTC",
      fieldValue: "2020-15-20 00:00:00",
      validationStatus: false,
      validationMessage: "The time provided '2020-15-20 00:00:00' is not a valid datetime"
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
