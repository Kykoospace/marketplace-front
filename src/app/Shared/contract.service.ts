import { Injectable } from '@angular/core';
import Web3 from 'web3';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  private web3;
  private SCPropertyFactory;
  private OWNER_ADDRESS = '0x6B90f554F47b1757167F2d4c165F8C22b75fa143';

  constructor() {
    this.web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'));
    const contract = require('truffle-contract');
    let SC_artifacts = require('src/assets/contracts/PropertyFactory.json');
    this.SCPropertyFactory = contract(SC_artifacts);
    this.SCPropertyFactory.setProvider(this.web3.currentProvider);
  }

  public createProperty(name: string, price: number, address: string) {
    this.SCPropertyFactory.deployed()
      .then((instance) => {
        return instance.createProperty(name, price, address, this.OWNER_ADDRESS, {
          from: this.OWNER_ADDRESS
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  public async getPropertiesByOwner() {
    const instance = await this.SCPropertyFactory.deployed();

    const properties = await instance.getPropertiesByOwner(this.OWNER_ADDRESS, {
      from: this.OWNER_ADDRESS
    });

    console.log('Properties by owner: ', properties);
    return properties;
  }

  public async getAllProperties() {
    const instance = await this.SCPropertyFactory.deployed();

    const properties = await instance.getAllProperties({
      from: this.OWNER_ADDRESS
    });
    console.log('All properties: ', properties);
    return properties;
  }
}
