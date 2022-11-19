import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from '../../client/client.model';
import { ClientService } from '../../client/service/client.service';
import { Absenceinfo } from '../absenceinfo.model';
import { AbsenceinfoService } from '../service/absenceinfo.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class AbsenceinfoUpdateComponent implements OnInit {
  id!: number;
  etudiants!: Client[];
  client: Client = new Client();
  retrievedImage : any;
  data1: number | undefined;
  test !: Absenceinfo[];
  constructor(public absenceService : AbsenceinfoService,public clientService : ClientService,public dialog: MatDialog,public dialog2: MatDialog,private router : Router, protected fb: UntypedFormBuilder , protected activatedRoute : ActivatedRoute) { }

  ngOnInit(): void {
    this.id =this.activatedRoute.snapshot.params["id"];
   this.list2();
  }
  onclick(idclient: any,cin : any): void {
    console.log("onclick bdaaat");
    console.log(idclient);
    this.clientService.get(idclient).subscribe( data => {
      this.client = data ;
      console.log(this.client);
      this.absenceService.updateabsence(this.id,this.client).subscribe(data =>{
        console.log(data);
        
  
      },
      error => console.log(error)
      )
    }, error => console.log(error))
   
  

    console.log("onclick bdaaat2");
    //console.log(this.client);
    console.log(this.id);

    
    (<HTMLInputElement> document.getElementById(idclient)).disabled = true;
    (<HTMLInputElement> document.getElementById(cin)).disabled = false;
    console.log("onclick salaaaat");
    console.log("ezfezfefe");
    

  
  }
  onclick2(): void {
    this.absenceService.checkUnmarkedAbsence(this.id).subscribe(data =>{
     this.test=data;
     
      console.log(data); 

    },
    error => console.log(error)
    )
  if(this.test.length>0){
    this.openDialog2('500ms', '500ms');
console.log("you cant do that")

  }else{
    this.absenceService.updateabsencevalidation(this.id).subscribe(data =>{
      console.log(data);
      this.openDialog('500ms', '500ms');


    },
    error => console.log(error)
    )
  }
}
  
  onclick1(idclient: any,cin : any): void {
   // console.log("onclick1 bdaaat")
    //this.client1= this.clientService.get(idClient);
   // this.absenceService.UpdateStatusabsence(this.idReservation,this.client);
   this.clientService.get(idclient).subscribe( data => {
    this.client = data ;
    console.log(this.client);
    this.absenceService.updateabsence(this.id,this.client).subscribe(data =>{
      console.log(data);


    },
    error => console.log(error)
    )
  }, error => console.log(error));

    (<HTMLInputElement> document.getElementById(idclient)).disabled = false;
    (<HTMLInputElement> document.getElementById(cin)).disabled = true;
    console.log("onclick1 salaaaaaaaaaaat")
    console.log("ezfezfefe")
  
  }
  openDialog2(enterAnimationDuration: string, exitAnimationDuration: string): void {
    let dialogRef1 = this.dialog2.open(DeleteAlertDialog, {
      width: '500px',
      enterAnimationDuration,
      exitAnimationDuration,
    });

   
  }
  
  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    let dialogRef = this.dialog.open(SuccessAlertDialog, {
      width: '500px',
      enterAnimationDuration,
      exitAnimationDuration,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.router.navigate(['dashboard/absenceinfo']);
    });
  }
  list2(){
    this.absenceService.listEtudiant(this.id).subscribe( data => {
      this.etudiants = data ;
      this.etudiants.forEach((element, index) => {
        console.log("tesst"+element.picByte)  

        this.retrievedImage = 'data:image/jpeg;base64,' +element.picByte;
        this.etudiants[index].picByte = this.retrievedImage; 
        console.log(element.nom + " : "+this.retrievedImage);

      });
    }, error => console.log(error))
  }



}
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
  selector: 'dialog-elements-example-dialog',
  templateUrl: 'delete-dialog.html',
})
export class DeleteAlertDialog {
  constructor(public dialogRef1: MatDialogRef<DeleteAlertDialog>) {

  }

  closeDialog() {
    //Write your stuff here
    this.dialogRef1.close(); // <- Closes the dialog
  }
}