import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Matiere } from '../matiere.model';
import { MatiereService } from '../service/matiere.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class MatiereDetailComponent implements OnInit {
  matiere: Matiere | null = null;
  
  id? : number  ;
  
  constructor(private activatedRoute :  ActivatedRoute, private matiereService : MatiereService) { }

  ngOnInit(): void {

    this.id =this.activatedRoute.snapshot.params["id"];
    this.matiereService.get(this.id!).subscribe( data => {
      this.matiere = data ;
    }, error => console.log(error))
  }

}
