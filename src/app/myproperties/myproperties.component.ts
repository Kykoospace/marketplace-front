import { Component, OnInit } from '@angular/core';
import {ContractService} from "../Shared/contract.service";

@Component({
  selector: 'app-myproperties',
  templateUrl: './myproperties.component.html',
  styleUrls: ['./myproperties.component.scss']
})
export class MypropertiesComponent implements OnInit {

  private properties: any;

  constructor(
    private contractService: ContractService
  ) { }

  ngOnInit() {
    this.contractService.getPropertiesByOwner()
      .then((properties) => {
        this.properties = properties;
      })
  }
}
