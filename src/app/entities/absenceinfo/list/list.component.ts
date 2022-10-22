import { Component, OnInit } from '@angular/core';
import { Reservation } from '../../reservation/reservation.model';
import { ReservationService } from '../../reservation/service/reservation.service';
import { Absenceinfo } from '../absenceinfo.model';
import { AbsenceinfoService } from '../service/absenceinfo.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class AbsenceinfoListComponent implements OnInit {

  reservations: Reservation[] | undefined ;
  searchText : any ;

  constructor(private absenceinfoService : AbsenceinfoService) { }

  ngOnInit(): void {
    this.getReservationbyformateur();
  }
  private getReservationbyformateur() : void {
    this.absenceinfoService.listReservation().subscribe(data=> {
      this.reservations = data ;
    })
  }

  }

 




