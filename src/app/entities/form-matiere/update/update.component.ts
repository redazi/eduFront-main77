import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, UntypedFormBuilder, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { ActivatedRoute } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Subject, Subscription } from 'rxjs';
import { Formation } from '../../formation/formation.model';
import { FormationService } from '../../formation/service/formation.service';
import { Matiere } from '../../matiere/matiere.model';
import { MatiereService } from '../../matiere/service/matiere.service';
import { FormMatiere } from '../form-matiere.model';
import { FormMatiereService } from '../service/form-matiere.service';


@Component({
  selector: 'app-formmatiereupdate',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})

export class FormMatiereUpdateComponent implements OnInit {
  resetFormSubject: Subject<boolean> = new Subject<boolean>();




  sFormation: Formation = new Formation();


  notifierSubscription: Subscription = this.formationService.subjectNotifier.subscribe(notified => {
    this.ngOnInit();
  });
  notifierSubscription2: Subscription = this.formMatiereService.subjectNotifier.subscribe(notified => {
    this.ngOnInit();
  });
  dropdownList :any = [];
  selectedItems :any = [];
  dropdownSettings :IDropdownSettings={};

  @Input() 
  idf? : number | undefined ;
  formMatiere  : FormMatiere = new FormMatiere();
  id!: number;

  editForm = this.fb.group({
    id: [],
    formation: [],
    matiere: [],
   

  });

  


  formations : Formation[] | undefined;
  selectedItemsRoot: any[] | undefined;
  constructor(private formMatiereService: FormMatiereService ,private matiereService : MatiereService, private formationService : FormationService , protected fb: UntypedFormBuilder , protected activatedRoute : ActivatedRoute) { }

  ngOnInit(): void {
    this.selectedItemsRoot = [];
    this.formationService.get(this.idf).subscribe( data => {
      this.sFormation = data ;
      this.getMatiere(this.sFormation.id);
     this.updateForm(this.sFormation)
      console.log(this.sFormation.nom);
      console.log(this.idf);
    }, error => console.log(error))

    
    this.getFormations();
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'nom',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      
    };
    

}
  onChange(e? : MatSelectChange):void {
    console.log(e?.value.id)
    this.idf=e?.value.id;
    this.getMatiere(e?.value.id);
   
  }

  getMatiere(id? : number):void{
    this.matiereService.notinlist(id!).subscribe( data => {
      this.dropdownList = data;
    }, error => console.log(error))
  }
  getFormations():void{
    this.formationService.list().subscribe( data => {
      this.formations = data;
    }, error => console.log(error))
  }


  protected updateForm(Formation: Formation): void {
    this.editForm.patchValue({
     
      formation: this.sFormation,
     
     
    });
  }

  save():void{

    console.log(this.formMatiere.formation);
    console.log(this.formMatiere.matiere);

    if(this.editForm.get(['id'])!.value === undefined ) { 
      for(const m of this.editForm.get(['matiere'])!.value){
        const formMatiere = this.createFromForm(m);
        this.formMatiereService.getbyFandM(this.editForm.get(['formation'])!.value.id , formMatiere?.matiere?.id)
        .subscribe( fm => {
          console.log(fm)
          if(fm===null){
            this.formMatiereService.add(formMatiere).subscribe(data =>{
              this.notifyForChange();
          
          },
          error => console.log(error)
  
          
            )}
            else{
              console.log("allreadyexist")
            }
          },
          error => console.log(error)
          );
        }
  }
   else{
    this.formMatiereService.update(this.id,this.formMatiere).subscribe(data =>{
      console.log(data);
    },
    error => console.log(error)
    )
   }
   
  }

  protected createFromForm(m : Matiere): FormMatiere {
    return {
      ...new FormMatiere(),
      id: this.editForm.get(['id'])!.value,
      formation: this.editForm.get(['formation'])!.value,
      matiere:  m,
    };
  }

  ngOnDestroy() {
    this.notifierSubscription.unsubscribe();
    this.notifierSubscription2.unsubscribe();  
  }

  compareObjects(o1: any, o2: any): boolean {
    return o1.id === o2.id && o1.nom === o2.nom;
  }

  notifyForChange() {
    this.formMatiereService.notifyAboutChange();
  }
}

