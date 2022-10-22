import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { Matiere } from '../matiere.model';
import { MatiereService } from '../service/matiere.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class MatiereListComponent implements OnInit {

  matieres : Matiere[] | undefined ;
  searchText : any ;
  data1: number | undefined;
  confirme = false ;
  isDeleteFailed: boolean | undefined ;
  isDeleteSucces: boolean | undefined ;
  errorMessage: any;
  succesMessage : any ;
  isShow: boolean | undefined;
  topPosToStartShowing = 100;

  constructor(private matiereService : MatiereService , public dialog: MatDialog) { }

  ngOnInit(): void {
    this.get();
    this.ionViewDidLoad()
  }

  ionViewDidLoad(){
    setTimeout(() => {
      this.isDeleteFailed = false ;
      this.isDeleteSucces = false ;
     
    }, 3000);
}

  private get() : void {
    this.matiereService.list().subscribe(data=> {
      this.matieres = data ;
    })
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
   public matiereService : MatiereService ,
   public dialogRef: MatDialogRef<DeleteDialogue>, 
   private router:Router
   ){}

  non(){
    this.dialogRef.close();
  }

  confirmer(){
    console.log(this.data)
    this.matiereService.delete(this.data!.req).subscribe({
      next : () => {
        this.succesMsg = 'matiere supprimee avec succes' ;
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
        this.errorMsg = 'Cette matiere est inscrite dans une formation' ;
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
