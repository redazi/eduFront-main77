import { Component, OnInit } from '@angular/core';
import { AbsenceinfoService } from '../../absenceinfo/service/absenceinfo.service';
import { ReservationService } from '../../reservation/service/reservation.service';

@Component({
  selector: 'app-listereservation',
  templateUrl: './listereservation.component.html',
  styleUrls: ['./listereservation.component.css']
})
export class ListereservationComponent implements OnInit {
reservations : any;
  constructor(private reservationService : ReservationService) { }

  ngOnInit(): void {
    
    this.getReservations();
  }
  private getReservations() : void {
    this.reservationService.list().subscribe(data=> {
      console.log("hanaa");
      this.reservations = data ;
    })
  }
}

 