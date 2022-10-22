import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { Matiere } from '../../matiere/matiere.model';
import { MatiereService } from '../../matiere/service/matiere.service';
import { Formation, IFormation } from '../formation.model';
import { FormationService } from '../service/formation.service';
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
export class FormationUpdateComponent implements OnInit {

  resetFormSubject: Subject<boolean> = new Subject<boolean>();

  matieres: Matiere[] = []

  formation: Formation = new Formation();
  id!: number;
  editForm = this.fb.group({
    id: [],
    nom: [],
    description:[],
    matieres: [],
   
  });

  constructor(public dialog: MatDialog,private matiereService : MatiereService, private formationService : FormationService , protected fb: UntypedFormBuilder , protected activatedRoute : ActivatedRoute) { }

  ngOnInit(): void {
   
    this.id =this.activatedRoute.snapshot.params["id"];
    this.formationService.get(this.id).subscribe( data => {
      this.formation = data ;
    }, error => console.log(error))
  
   
  }

  protected updateForm(formation: IFormation): void {
    this.editForm.patchValue({
      id: formation.id,
      nom: formation.nom,
      description : formation.description ,
      matieres: formation.matieres,
      
      
    });
  }

  save():void{
    console.log(this.formation.nom);
    if(this.editForm.get(['id'])!.value === undefined ) { 
      this.formationService.add(this.formation).subscribe(data =>{
        console.log(data);
        this.notifyForChange();
        this.openDialog('500ms', '500ms');
      },
      error => console.log(error)
      );
    }
   else{
    this.formationService.update(this.id,this.formation).subscribe(data =>{
      console.log(data);
      this.notifyForChange();
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
      
    });
  }

 notifyForChange() {
  this.formationService.notifyAboutChange();
}

}
