import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Reservation } from '../../reservation/reservation.model';
import { ReservationService } from '../../reservation/service/reservation.service';
import { Panier } from '../panier.model';
import { PanierService } from '../service/panier.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class PanierListComponent implements OnInit {
  searchText : any ;
  data1: number | undefined;
  confirme = false ;
  isDeleteFailed: boolean | undefined ;
  isDeleteSucces: boolean | undefined ;
  errorMessage: any;
  succesMessage : any ;
  isShow: boolean | undefined;
  topPosToStartShowing = 100;
  paniers : Panier[] | undefined;
  reservations : Reservation[] | undefined;
  reservations1 : Reservation[] | undefined;
  constructor(private panierservice : PanierService ,private reservationservice : ReservationService , public dialog: MatDialog) { }
  ngOnInit(): void {
    
    this.get();
    //this.getfinal();
    this.ionViewDidLoad()
  }

  ionViewDidLoad(){
    setTimeout(() => {
      this.isDeleteFailed = false ;
      this.isDeleteSucces = false ;
     
    }, 3000);
}

  private get() : void {
    this.panierservice.getplanification().subscribe(data=> {
      this.paniers = data ;
      console.log(this.paniers.length)
      this.paniers?.forEach(element => {
        console.log(element.planification?.id);
       this.reservationservice.listPlanif(element.planification?.id).subscribe(data=> {
          this.reservations=data ;

          console.log("aanaaa hnaaaa :")
         element.reservations=this.reservations;
            this.reservations1 = this.reservations;
   
            element.reservations.forEach(element1 => {
              console.log("aanaaa hnaaaa : "+element1.date);
             });
             
        

         
        })
     
        //console.log(element.id);
     
    
       });
       



    })
  }

  private getfinal() : void {
    console.log("aanaaa hnaaaa :22222")
    console.log(this.paniers?.length);
   this.paniers?.forEach(element => {
    console.log(element.planification?.id);
   /* this.reservationservice.listPlanif(element.planification?.id).subscribe(data=> {
      this.reservations=data ;
    })*/
    console.log("aanaaa hnaaaa :")
    console.log(element.id);


   });
   
  


    
  }


  delete(id: number): void {
   // this.matiereService.delete(id).subscribe(() => {
     //this.get();
    //});
    this.data1 = id ;
    this.openDialog('500','500')
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(DeleteDialogue, {
      data : {req :this.data1, res : null },
      width: '500px',
      enterAnimationDuration,
      exitAnimationDuration,
    })
    .afterClosed().subscribe(
      data =>  {
        this.ngOnInit();
        this.gotoTop();
      console.log(data) ;
      this.isDeleteFailed = data.res.delF;
      this.isDeleteSucces = data.res.delS;
      console.log(this.isDeleteFailed) ;
      this.errorMessage = data.res.err ; 
      this.succesMessage = data.res.suc;
     // this.errorMessage=data.err ; 
     // this.isDeleteFailed=res.del ;
     
    })
    ;
  }

  // TODO: Cross browsing
  gotoTop() {
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
  }

}

@Component({
  selector: 'delete-dialog',
  templateUrl: 'delete-dialog.html',
})
export class DeleteDialogue {
  errorMsg? : String ;
  succesMsg? : String;
  isDeleteFailed : boolean | undefined ;
  isDeleteSucces : boolean | undefined ;

  constructor( 
   @Inject(MAT_DIALOG_DATA) public data: any ,
   public panierservice : PanierService ,
   public dialogRef: MatDialogRef<DeleteDialogue>, 
   private router:Router
   ){}

  non(){
    this.dialogRef.close();
  }

  confirmer(){
    console.log(this.data)
    this.panierservice.delete(this.data!.req).subscribe({
      next : () => {
        this.succesMsg = 'panieer supprimee avec succes' ;
        this.errorMsg = undefined ;
         this.isDeleteFailed=false 
         this.isDeleteSucces=true 
         this.data.res = {
          err: this.errorMsg ,
          suc: this. succesMsg, 
          delF: this.isDeleteFailed,
          delS:this.isDeleteSucces
      }
        this.dialogRef.close(  this.data  )},
      error:()=>{
        this.succesMsg = undefined ;
        this.errorMsg = 'Cette panier est inscrite dans une formation' ;
        this.isDeleteFailed = true;
        this.isDeleteSucces=false ; 
        this.data.res = {
          err: this.errorMsg ,
          suc: this. succesMsg, 
          delF: this.isDeleteFailed,
          delS:this.isDeleteSucces
      }
        this.dialogRef.close(  this.data  )
      },
      complete: () => {
        
  }
    
   
  })
  
 

     }


     
}
