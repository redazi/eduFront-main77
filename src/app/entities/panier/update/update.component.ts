import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Subject, Subscription } from 'rxjs';
import { Client } from '../../client/client.model';
import { ClientService } from '../../client/service/client.service';
import { Formation } from '../../formation/formation.model';
import { FormationService } from '../../formation/service/formation.service';
import { Reservation } from '../../reservation/reservation.model';
import { ReservationService } from '../../reservation/service/reservation.service';
import { IPanier, Panier } from '../panier.model';
import { PanierService } from '../service/panier.service';
@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: 'succes-alert-dialog.html',
})
export class SuccessAlertDialog {
  constructor(public dialogRef: MatDialogRef<SuccessAlertDialog>) {

  }

  closeDialog() {
    //Write your stuff here
    this.dialogRef.close(); // <- Closes the dialog
  }
}

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})

export class PanierUpdateComponent implements OnInit {
  sClient : Client = new Client();
  idc : number | any ;
  dropdownList :any = [];
  selectedItems :any = [];
  dropdownSettings :IDropdownSettings={};
  clients : Client[] | undefined;
  formations : Formation[] | undefined;
  panier1  : Panier = new Panier();
  panier  : Panier = new Panier();
  id!: number;
  resetFormSubject: Subject<boolean> = new Subject<boolean>();

  notifierSubscription: Subscription = this.panierService.subjectNotifier.subscribe(notified => {
    this.ngOnInit();
  });
  notifierSubscription2: Subscription = this.panierService.subjectNotifier.subscribe(notified => {
    this.ngOnInit();
  });
  editForm = this.fb.group({
    id: [],
    client: [],
    formation: [],
    
   

  });
  selectedItemsRoot: any[] | undefined;

  constructor(private formationservice : FormationService ,public dialog: MatDialog,private router : Router,private panierService : PanierService,private formationService : FormationService,private clientService : ClientService, protected fb: UntypedFormBuilder , protected activatedRoute : ActivatedRoute) { }
  compareObjects(o1: any, o2: any): boolean {
    return o1.id === o2.id && o1.nom === o2.nom;
  }
  onChange(e? : MatSelectChange):void {
    console.log(e?.value.id)
    this.idc=e?.value.id;
    this.getFormations(e?.value.id);
   
  }
  ngOnInit(): void {
    this.selectedItemsRoot = [];
    this.clientService.get(this.idc).subscribe( data => {
      this.sClient = data ;
      this.getFormations(this.sClient.id);
     this.updateForm(this.sClient)
      console.log(this.sClient.nom);
      console.log(this.idc);
    }, error => console.log(error))

    
    this.getClients();
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'nom',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      
    };
    
  }
  getFormations(id? : number):void{
    this.formationService.notinlist(id!).subscribe( data => {
      this.dropdownList = data;
    }, error => console.log(error))
  }
  getClients():void{
    this.clientService.list().subscribe( data => {
      this.clients = data;
    }, error => console.log(error))
  }
  
  protected updateForm(panier: IPanier): void {
    this.editForm.patchValue({
      id: panier.id,
      client: panier.client,
      formation: panier.formation,
      
     
    });
  }
  notifyForChange() {
    this.panierService.notifyAboutChange();
  }
  
  save():void{
    
  /*  console.log(this.editForm.get(['formateur'])!.value);
    console.log(this.editForm.get(['salle'])!.value);
    console.log(this.editForm.get(['creneau'])!.value);
    console.log(this.editForm.get(['matiere'])!.value);
    console.log(this.reservation.date);
    */
    if(this.editForm.get(['id'])!.value === undefined ) { 
      for(const f of this.editForm.get(['formation'])!.value){
        const panier1 = this.createFromForm(f);      
      
      
        console.log("panier :  "+this.panier1.formation?.nom);
        this.panierService.add(panier1).subscribe(data =>{
          console.log(data);
          
          this.notifyForChange();
          this.openDialog('500ms', '500ms');

          //this.router.navigate(['/dashboard/panier'])
  
        },
        error => console.log(error)
        );
      }
     
     
    }
   else{
    this.panierService.update(this.id,this.panier).subscribe(data =>{
      console.log(data);
      this.router.navigate(['/dashboard/panier'])
      this.openDialog('500ms', '500ms');

    },
    error => console.log(error)
    )
   }

   
  }
  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    let dialogRef = this.dialog.open(SuccessAlertDialog, {
      width: '500px',
      enterAnimationDuration,
      exitAnimationDuration,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.router.navigate(['dashboard/matieres']);
    });
  }
  protected createFromForm(f : Formation): Panier {
    return {
      ...new Panier(),
      id: this.editForm.get(['id'])!.value,
      client : this.editForm.get(['client'])!.value,

      formation : f,
      
     
    
    };
  }

}

