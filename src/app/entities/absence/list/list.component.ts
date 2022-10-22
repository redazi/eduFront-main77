import { Component, OnInit } from '@angular/core';
import { Absence } from '../absence.model';
import { AbsenceService } from '../service/absence.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class AbsenceListComponent implements OnInit {

  absences: Absence[] | undefined ;
  searchText : any ;

  constructor(private absenceService : AbsenceService) { }

  ngOnInit(): void {
    this.get();
  }

  private get() : void {
    this.absenceService.list().subscribe(data=> {
      this.absences = data ;
    })
  }

  delete(id: number): void {
    this.absenceService.delete(id).subscribe(() => {
     this.get();
    });
  }

}
