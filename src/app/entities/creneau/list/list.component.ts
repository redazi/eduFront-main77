import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../client/service/client.service';
import { Creneau } from '../creneau.model';
import { CreneauService } from '../service/creneau.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class CreneauListComponent implements OnInit {

  creneau: Creneau[] | undefined ;
  searchText : any ;

  constructor(private creneauService : CreneauService) { }

  ngOnInit(): void {
    this.get();
  }

  private get() : void {
    this.creneauService.list().subscribe(data=> {
      this.creneau = data ;
    })
  }

  delete(id: number): void {
    this.creneauService.delete(id).subscribe(() => {
     this.get();
    });
  }
}