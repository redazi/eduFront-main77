import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { IMatiere, Matiere } from '../matiere.model';
import { MatiereService } from '../service/matiere.service';
import { Location } from '@angular/common';
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
export class MatiereUpdateComponent implements OnInit {
  matiere: Matiere = new Matiere();
  id!: number;
  editForm = this.fb.group({
    id: [],
    nom: [],
    libelle: [],
    description:[],
   
  });

  constructor(private router :Router ,private location : Location ,public dialog: MatDialog , private matiereService : MatiereService , protected fb: UntypedFormBuilder , protected activatedRoute : ActivatedRoute) { }

  ngOnInit(): void {
    this.id =this.activatedRoute.snapshot.params["id"];
    this.matiereService.get(this.id).subscribe( data => {
      this.matiere = data ;
    }, error => console.log(error))
  }

  protected updateForm(matiere: IMatiere): void {
    this.editForm.patchValue({
      id: matiere.id,
      nom: matiere.nom,
      libelle: matiere.libelle,
      description : matiere.description
      
    });
  }

  save():void{
    console.log(this.matiere.nom);
    if(this.editForm.get(['id'])!.value === undefined ) { 
      this.matiereService.add(this.matiere).subscribe(data =>{
        this.openDialog('500ms', '500ms');
        console.log(data);
      },
      error => console.log(error)
      );
    }
   else{
    this.matiereService.update(this.id,this.matiere).subscribe(data =>{
      console.log(data);
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
  }

