import { Component, OnInit } from '@angular/core';
import { MenuItem } from "primeng";
import Web3 from 'web3';
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private createPropertyForm: FormGroup;
  private menuItems: MenuItem[];
  private web3;
  private SCPropertyFactory;
  private SCPropertyHelper;
  private OWNER_ADDRESS = '0x6B90f554F47b1757167F2d4c165F8C22b75fa143';

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'));
    const contract = require('truffle-contract');
    let SC_artifacts = require('src/assets/contracts/PropertyFactory.json');
    this.SCPropertyFactory = contract(SC_artifacts);
    this.SCPropertyFactory.setProvider(this.web3.currentProvider);

    SC_artifacts = require('src/assets/contracts/PropertyHelper.json');
    this.SCPropertyHelper = contract(SC_artifacts);
    this.SCPropertyHelper.setProvider(this.web3.currentProvider);
  }

  ngOnInit() {
    this.menuItems = [
      {
        label: 'Propriétés',
        icon: 'pi pi-home'
      }
    ];

    this.createPropertyForm = this.formBuilder.group({
      name: this.formBuilder.control('banane'),
      price: this.formBuilder.control(1000000),
      address: this.formBuilder.control('steak')
    });
  }

  test() {
    const { name, price, address } = this.createPropertyForm.value;
    console.log(this.createProperty(name, price, address));
  }

  createProperty(name: string, price: number, address: string) {
    this.SCPropertyFactory.deployed()
      .then((instance) => {
        return instance.createProperty(name, price, address, {
          from: this.OWNER_ADDRESS
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getPropertiesByOwner() {
    this.SCPropertyHelper.deployed()
      .then(async (instance) => {
        const properties = await instance.getPropertiesByOwner(this.OWNER_ADDRESS, {
          from: this.OWNER_ADDRESS
        });
        console.log(properties);
        return properties;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getAllProperties() {
    this.SCPropertyHelper.deployed()
      .then(async (instance) => {
        const properties = await instance.getAllProperties({
          from: this.OWNER_ADDRESS
        });
        console.log(properties);
        return properties;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
