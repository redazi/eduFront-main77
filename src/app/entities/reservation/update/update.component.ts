import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, UntypedFormBuilder, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Creneau } from '../../creneau/creneau.model';
import { CreneauService } from '../../creneau/service/creneau.service';
import { Formateur } from '../../formateur/formateur.model';
import { FormateurService } from '../../formateur/service/formateur.service';
import { FormationService } from '../../formation/service/formation.service';
import { Matiere } from '../../matiere/matiere.model';
import { MatiereService } from '../../matiere/service/matiere.service';
import { SalleReservation } from '../../salle-reservation/salle-reservation.model';
import { Salle } from '../../salle/salle.model';
import { SalleService } from '../../salle/service/salle.service';
import { UtilisateurService } from '../../utilisateur/service/utilisateur.service';
import { Utilisateur } from '../../utilisateur/utilisateur.model';
import { IReservation, Reservation } from '../reservation.model';
import { ReservationService } from '../service/reservation.service';




@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class ReservationUpdateComponent implements OnInit {

   
  
  resetFormSubject: Subject<boolean> = new Subject<boolean>();

  idUser : number = Number(localStorage.getItem('userId'));

  salleReservation : SalleReservation = new SalleReservation();
  reservation1  : Reservation = new Reservation();
  reservationOld  : Reservation = new Reservation();
  reservation  : Reservation = new Reservation();
  id!: number;
  user : Utilisateur | undefined;
  date : Date = new Date() ;
  editForm = this.fb.group({
    id: [],
    salle: ['',[ Validators.required ]],
    creneau: ['',[ Validators.required ]],
    matiere: ['',[ Validators.required ]],
    formateur: ['',[ Validators.required ]],
    
      date: new FormControl('', Validators.required),
      datefin: new FormControl('', Validators.required)
    },);
   

  

  salles : Salle[] | undefined;
  creneaux : Creneau[] | undefined;
  Formateurs : Formateur[] | undefined;
  matieres : Matiere[] | undefined;
  
  constructor(public dialogRef: MatDialogRef<SuccessAlertDialog>,
              public dialog: MatDialog,
              private utilisateurService : UtilisateurService,
              private creneauService : CreneauService,
              private router : Router,
              private reservationService : ReservationService,
              private matiereService : MatiereService,
              private salleService : SalleService, 
              private formateurService : FormateurService , 
              protected fb: FormBuilder , 
              protected activatedRoute : ActivatedRoute,
              @Inject(MAT_DIALOG_DATA) public data: any ,

              ) { }

  ngOnInit(): void {

    this.getFormations();
    this.getMatieres();
    this.getSalles();
    
    this.getUser();
    this.id =this.activatedRoute.snapshot.params["id"];
    this.reservationService.get(this.data).subscribe( data => {
      this.reservation = data ;
      this.reservationOld = data ;
    }, error => console.log(error))
   

    
  }

  getCreneaux():void{
    console.log(this.editForm.get(['salle'])!.value)
    this.creneauService.dispo(this.editForm.get(['salle'])!.value,this.data).subscribe( data => {
      this.creneaux = data;
    }, error => console.log(error))
  }
  getSalles():void{
    this.salleService.list().subscribe( data => {
      this.salles = data;
    }, error => console.log(error))

    this.getCreneaux();
  }
  getFormations():void{
    this.formateurService.list().subscribe( data => {
      this.Formateurs = data;
    }, error => console.log(error))
  }
  getMatieres():void{
    this.matiereService.list().subscribe( data => {
      this.matieres = data;
    }, error => console.log(error))
  }

  notifyForChange() {
    this.reservationService.notifyAboutChange();
  }
 // protected updateForm(reservation: IReservation): void {
   // this.editForm.patchValue({
     // id: reservation.id,
      //formateur: reservation.formateur,
      //matiere: reservation.matiere,
      //creneau : reservation.creneau,
      //salle : reservation.salle,
      //date : reservation.date,
     
    //});
 // }


  save():void{
    
    console.log(this.editForm.get(['formateur'])!.value);
    console.log(this.editForm.get(['salle'])!.value);
    console.log(this.editForm.get(['creneau'])!.value);
    console.log(this.editForm.get(['matiere'])!.value);
    console.log(this.salleReservation.date);
    
    if(this.editForm.get(['id'])!.value === undefined ) { 
      const reservation1 = this.createFromForm();
     
     // console.log("date : ezrezr "+reservation1.date);
      this.reservationService.add(reservation1).subscribe(data =>{
        console.log(data);
        this.notifyForChange();
        this.openDialog('500ms','500ms'),
        
        this.closeDialog();
        

      },
      error =>{
        if(error.error.s!==undefined){
          this.openDialog2('500ms','500ms',error.error)
        console.log(error.error)
        }
        
      } 
      );
    }
    else{
      console.log(this.reservation.plannification?.id)
      console.log(this.reservation)
      this.reservationService.listPlanif(this.reservation.plannification?.id).subscribe( data => {
        let reservations = data 
        for(var r of reservations){
          this.reservationService.update(r?.id , this.reservation).subscribe(data =>{
            console.log(data);
            this.notifyForChange();
           
            
            this.closeDialog();
          },
          error => console.log(error)
          )
        }
        this.openDialog('500ms','500ms')
      }, error => console.log(error))
  console.log(this.reservation?.datefin)
  console.log(this.reservationOld?.datefin!)

   
      console.log("true")
          this.reservationService.extend(this.reservation).subscribe(data=> {
              console.log("extendss succes")
          },
          error=>{

          });
          
    
     
    } 
  }
  closeDialog() {
    //Write your stuff here
    this.dialogRef.close(); // <- Closes the dialog
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    let dialogRef = this.dialog.open(SuccessAlertDialog, {
      width: '500px',
      enterAnimationDuration,
      exitAnimationDuration,
    });

    dialogRef.afterClosed().subscribe(result => {
      
    });
  }
  openDialog2(enterAnimationDuration: string, exitAnimationDuration: string , o : any): void {
    let dialogRef = this.dialog.open(ErrorDialogue, {
      data : o ,
      width: '500px',
      enterAnimationDuration,
      exitAnimationDuration,
    });

    dialogRef.afterClosed().subscribe(result => {
      
    });
  }
  getUser(){
    this.utilisateurService.get(this.idUser).subscribe(data=> {
      this.user = data ;
      console.log(this.user);
    })
  }
  protected createFromForm(): Reservation {
    return {
      ...new Reservation(),
      id: this.editForm.get(['id'])!.value,
     
      matiere : this.editForm.get(['matiere'])!.value,
      formateur : this.editForm.get(['formateur'])!.value,
      datefin : this.reservation.datefin,
      salle : this.editForm.get(['salle'])!.value,
      utilisateur : this.user,
      creneau : this.editForm.get(['creneau'])!.value,
      date : this.data,
      description : undefined ,
    };
  }

  compareObjects(o1: any, o2: any): boolean {
    return o1.id === o2.id && o1.nom === o2.nom;
  }
  protected createFromForm2(): SalleReservation {
    return {
      ...new SalleReservation(),
      id: this.editForm.get(['id'])!.value,
      
    };
  }

  
}

@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: 'succes-alert-dialog.html',
})
export class SuccessAlertDialog {
  constructor(public dialogRef: MatDialogRef<SuccessAlertDialog> , 
    ) {

  }

  closeDialog() {
    //Write your stuff here
    this.dialogRef.close(); // <- Closes the dialog
  }
}

@Component({
  selector: 'error-dialog',
  templateUrl: 'error-dialog.html',
})
export class ErrorDialogue {
   date  : String | undefined ;
   salle : Salle | undefined ;
   creneau : Creneau | undefined;

  constructor( 
    @Inject(MAT_DIALOG_DATA) public data: any,
   public dialogRef: MatDialogRef<ErrorDialogue>, 
   
   ){}

   ngOnInit(): void {
     const d = this.data.d.toString().split('-');
     const d2 = d[2].toString().split('T'); 
     this.date =''+d[0]+'-'+d[1]+'-'+d2[0]+''
     this.salle = this.data.s
     this.creneau = this.data.c 

}

  non(){
    this.dialogRef.close();
  }
}


 


