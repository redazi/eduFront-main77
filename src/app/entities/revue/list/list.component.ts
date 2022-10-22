import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Utilisateur } from '../../utilisateur/utilisateur.model';
import { Revue } from '../revue.model';
import { RevueService } from '../service/revue.service';

@Component({
  selector: 'review-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class RevueListComponent implements OnInit {
  notifierSubscription: Subscription = this.revueService.subjectNotifier.subscribe(notified => {
    this.ngOnInit();
  });

  revues : Revue[] | undefined;
  @Input() 
  idm? : number | undefined ;
  data1  : number | undefined ; 
  idUser : number = Number(localStorage.getItem('userId')) ;
  constructor(private revueService : RevueService ,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.get();
    console.log();
  }

  

  private get() : void {
    this.revueService.listbyM(this.idm).subscribe(data=> {
      this.revues = data ;
    })
  }

 

  ngOnDestroy() {
    this.notifierSubscription.unsubscribe();
   
  }

  delete(id: number): void {
  
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
        
       console.log(data) ;
       
      
     })
     ;
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
   public revueService : RevueService ,
   public dialogRef: MatDialogRef<DeleteDialogue>, 
   
   ){}

  non(){
    this.dialogRef.close();
  }

  confirmer(){
    console.log(this.data)
    this.revueService.delete(this.data!.req).subscribe({
      next : () => {
        
        this.dialogRef.close(  this.data  )},
      error:()=>{
       
        this.dialogRef.close(  this.data  )
      },
      complete: () => {
        
  }
    
   
  })
  
 

     }


     
}
