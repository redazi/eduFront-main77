import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { FormMatiere } from '../../form-matiere/form-matiere.model';
import { FormMatiereService } from '../../form-matiere/service/form-matiere.service';
import { Matiere } from '../../matiere/matiere.model';
import { MatiereService } from '../../matiere/service/matiere.service';
import { Formation } from '../formation.model';
import { FormationService } from '../service/formation.service';


@Component({
  selector: 'app-formmatieredetail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class FormationDetailComponent implements OnInit {
  resetFormSubject: Subject<boolean> = new Subject<boolean>();
  formation: Formation | null = null;
  formMatiere: FormMatiere | null = null;
  id? : number  ;
  matieres? : Matiere[]  ;
  @Input() 
  idf? : number | undefined ;

  

  notifierSubscription: Subscription = this.formMatiereService.subjectNotifier.subscribe(notified => {
    this.ngOnInit();
  });
  constructor(protected activatedRoute:ActivatedRoute ,private formMatiereService:FormMatiereService, private formationService:FormationService, private matiereService : MatiereService) { }

  ngOnInit(): void {
    this.id =this.activatedRoute.snapshot.params["id"];
    this.getMatiere();
    this.formationService.get(this.id!).subscribe( data => {
      this.formation = data ;
    }, error => console.log(error))
  }


  getMatiere():void{
    if(this.idf===undefined){
      this.matiereService.listForFormation(this.id!).subscribe( data => {
        this.matieres = data;
        console.log(this.matieres)
      }, error => console.log(error))
    }else{
      this.matiereService.listForFormation(this.idf!).subscribe( data => {
        this.matieres = data;
        console.log(this.matieres)
      }, error => console.log(error))
    }
    
  }

  unAssign(idm?:number):void{
    this.formMatiereService.getbyFandM(this.formation?.id,idm).subscribe( data => {
      this.formMatiere = data ;
      this.formMatiereService.delete(this.formMatiere?.id).subscribe(() => {
        this.notifyForChange();
       
       });

    }, error => console.log(error))
   
  }
  ngOnDestroy() {
    this.notifierSubscription.unsubscribe();
  }
  notifyForChange() {
    this.formMatiereService.notifyAboutChange();
  }

  ngOnChanges() {
   this.ngOnInit();
    }   
}
