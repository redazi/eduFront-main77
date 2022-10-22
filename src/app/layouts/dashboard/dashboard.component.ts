import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/auth/login.service';
import { Location } from '@angular/common';
import { Client } from 'src/app/entities/client/client.model';
import { ClientService } from 'src/app/entities/client/service/client.service';
import { Matiere } from 'src/app/entities/matiere/matiere.model';
import { MatiereService } from 'src/app/entities/matiere/service/matiere.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  constructor( public loginService:LoginService ,private  router : Router,private location : Location
    ) { }

  ngOnInit(): void {
    
   
  }

backd():void{
  this.location.back();
}
  
 
  

  
}
