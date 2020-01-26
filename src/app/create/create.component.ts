import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ContractService} from "../Shared/contract.service";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  private createPropertyForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private contractService: ContractService
  ) { }

  ngOnInit() {
    this.createPropertyForm = this.formBuilder.group({
      name: this.formBuilder.control('banane'),
      price: this.formBuilder.control(1000000),
      address: this.formBuilder.control('steak')
    });
  }

  createProperty() {
    this.contractService.createProperty(
      this.createPropertyForm.get('name').value,
      this.createPropertyForm.get('price').value,
      this.createPropertyForm.get('address').value
    )
  }
}
