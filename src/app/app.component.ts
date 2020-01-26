import {Component, OnInit} from '@angular/core';
import {MenuItem} from "primeng";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'MarketPlace-Front';
  private menuItems: MenuItem[];

  ngOnInit() {
    this.menuItems = [
      {
        label: 'Accueil',
        icon: 'pi pi-home',
        routerLink: ['/home']
      },
      {
        label: 'Nouveau bien',
        icon: 'pi pi-plus',
        routerLink: ['/create']
      },
      {
        label: 'Mes biens',
        icon: 'pi pi-home',
        routerLink: ['myproperties']
      }
    ];
  }
}
