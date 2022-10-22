import { Component, OnInit } from '@angular/core';
import { Reservation } from '../../reservation/reservation.model';
import { AbsenceinfoService } from '../service/absenceinfo.service';

@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.css']
})
export class HistoriqueComponent implements OnInit {

  reservations: Reservation[] | undefined ;
  searchText : any ;

  constructor(private absenceinfoService : AbsenceinfoService) { }

  ngOnInit(): void {
    this.getReservationbyformateur();
  }
  private getReservationbyformateur() : void {
    this.absenceinfoService.listReservationvalide().subscribe(data=> {
      this.reservations = data ;
    })
  }

  }
