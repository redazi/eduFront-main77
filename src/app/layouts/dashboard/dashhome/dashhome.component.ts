import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/entities/client/client.model';
import { ClientService } from 'src/app/entities/client/service/client.service';
import { Matiere } from 'src/app/entities/matiere/matiere.model';
import { MatiereService } from 'src/app/entities/matiere/service/matiere.service';

@Component({
  selector: 'app-dashhome',
  templateUrl: './dashhome.component.html',
  styleUrls: ['./dashhome.component.css']
})
export class DashhomeComponent implements OnInit {
  matieres : Matiere[] | undefined ;
  matieres1 : Matiere[] | undefined ;
  clients: Client[] | undefined ;
  clients1: Client[] | undefined ;
  countclient: number | undefined; 
  coutmatiere : number | undefined;
  searchText : any ;
  constructor(private clientService : ClientService,private matiereService : MatiereService) { }

  ngOnInit(): void {
    this.getClient();
    this.getMatiere();
    this.countClient();
    this.countMatiere();
  }

  private getClient() : void {
    this.clientService.list().subscribe(data=> {
      this.clients = data ;
    
    })
  }

  private countClient() : void {
    console.log("haanaaaaaaaaaaaaaaaaaaa")
    
       this.clientService.list().subscribe(data=> {
       this.clients1  = data ;
       this.countclient = this.clients1?.length;
       console.log(this.countclient);
     });
     
 }
 private countMatiere() : void {
   console.log("haanaaaaaaaaaaaaaaaaaaa 2 ")
   
      this.matiereService.list().subscribe(data=> {
      this.matieres1  = data ;
      this.coutmatiere = this.matieres1?.length;
      console.log(this.coutmatiere);
    });
    
}

deleteClient(id: number): void {
 this.clientService.delete(id).subscribe(() => {
  this.getClient();
 });
}
private getMatiere() : void {
 this.matiereService.list().subscribe(data=> {
   this.matieres = data ;
 })
}

deleteMatiere(id: number): void {
 this.matiereService.delete(id).subscribe(() => {
  this.getMatiere();
 });

}

}
