import { Component, Input, OnInit } from '@angular/core';
import {  UntypedFormBuilder } from '@angular/forms';
import { Matiere } from '../../matiere/matiere.model';
import { MatiereService } from '../../matiere/service/matiere.service';
import { Utilisateur } from '../../utilisateur/utilisateur.model';
import { IRevue, Revue } from '../revue.model';
import { RevueService } from '../service/revue.service';
import { UtilisateurService } from '../../utilisateur/service/utilisateur.service';
import { Subject } from 'rxjs';
@Component({
  selector: 'review-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class RevueUpdateComponent implements OnInit {

  resetFormSubject: Subject<boolean> = new Subject<boolean>();
  
  idUser : number = Number(localStorage.getItem('userId')) ;
  user : Utilisateur | undefined;
  matiere : Matiere | undefined;

  @Input() 
  idm? : number | undefined ;

  
  editForm = this.fb.group({
    id: [],
    utilisateur: [],
    matiere: [],
    date:[],
    commentaire: []
   
  });
  constructor(private revueService : RevueService, private fb : UntypedFormBuilder , private matiereService : MatiereService,private utilisateurService : UtilisateurService) { }

  ngOnInit(): void {
    console.log(localStorage.getItem('userId'));
    this.getUser();
    this.getMatiere();
  }

  protected updateForm(revue: IRevue): void {
    this.editForm.patchValue({
      id: revue.id,
      utilisateur: revue.utilisateur ,
      matiere: revue.matiere ,
      commentaire: revue.commentaire
      
    });
  }

  save():void{
    const revue = this.createFromForm();
      this.revueService.add(revue).subscribe(data =>{
        this.notifyForChange();
       },
      error => console.log(error)
      );
  }

  notifyForChange() {
    this.revueService.notifyAboutChange();
  }

  getUser(){
    this.utilisateurService.get(this.idUser).subscribe(data=> {
      this.user = data ;
      console.log(this.user);
    })
  }

  getMatiere(){
    this.matiereService.get(this.idm!).subscribe(data=> {
      this.matiere = data ;
      console.log(this.matiere);
    })
  }

  protected createFromForm(): IRevue {
    return {
      ...new Revue(),
      id: this.editForm.get(['id'])!.value,
      utilisateur: this.user,
      matiere: this.matiere,  
      date:undefined,
      commentaire: this.editForm.get(['commentaire'])!.value,
    };
  }
}

