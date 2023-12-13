import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink, RouterOutlet} from '@angular/router';
import {DashboardComponent} from "./dashboard/dashboard.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, DashboardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ecom-web-app';
  actions : Array<any> = [
    {title : "Home", "route":"/home", icon : "bi bi-house"},
    {title : "Products", "route":"/products", icon : "bi bi-search"},
    {title : "New Product", "route":"/new-product", icon : "bi bi-plus-circle-fill"},
  ];
  currentAction:any;

  setCurrentAction(action: any) {
    this.currentAction = action;
  }
}

