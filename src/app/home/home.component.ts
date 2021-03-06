import { Component, OnInit } from '@angular/core';
import {ContractService} from "../Shared/contract.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private properties: any;

  constructor(
    private contractService: ContractService
  ) { }

  ngOnInit() {
    this.contractService.getAllProperties()
      .then((properties) => {
        this.properties = properties;
      })
  }
}
