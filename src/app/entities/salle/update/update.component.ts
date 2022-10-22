import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ISalle, Salle } from '../salle.model';
import { SalleService } from '../service/salle.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class SalleUpdateComponent implements OnInit {

  salle: Salle = new Salle();
  id!: number;
  editForm = this.fb.group({
    id: [],
    code: [],
    nbrPlace: [],
    type: [],
  });



  constructor(private router :Router ,private salleService : SalleService , public dialog: MatDialog , protected fb: UntypedFormBuilder , protected activatedRoute : ActivatedRoute) { }

  ngOnInit(): void {
    this.id =this.activatedRoute.snapshot.params["id"];
    this.salleService.get(this.id).subscribe( data => {
      this.salle = data ;
    }, error => console.log(error))
  }

  protected updateForm(salle: ISalle): void {
    this.editForm.patchValue({
      id: salle.id,
      code: salle.code,
      nbrPlace: salle.nbrPlace,
      type: salle.type,
      
    });
  }

  save():void{
    console.log("salle : "+this.salle.code);
    if(this.editForm.get(['id'])!.value === undefined ) { 
      this.salleService.add(this.salle).subscribe(data =>{
        this.openDialog('500ms', '500ms');
        console.log(data);
      },
      error => console.log(error)
      );
    }
   else{
    this.salleService.update(this.id,this.salle).subscribe(data =>{
      this.openDialog('500ms', '500ms');
      console.log(data);
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
      this.router.navigate(['dashboard/salles']);
    });
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