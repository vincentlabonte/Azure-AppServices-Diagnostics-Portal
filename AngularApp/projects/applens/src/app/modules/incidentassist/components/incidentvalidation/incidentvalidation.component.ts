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
      Name: "What is the name of the site.",
      Value: "baggymakery",
      ValidationStatus: false,
      ValidationMessage: "The site with name 'baggymakery' does not exist"
    },
    {
      Name: "Impact start time in UTC",
      Value: "2020-15-20 00:00:00",
      ValidationStatus: false,
      ValidationMessage: "The time provided '2020-15-20 00:00:00' is not a valid datetime"
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
