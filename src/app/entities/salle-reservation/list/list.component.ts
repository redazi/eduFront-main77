import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import { SalleReservation } from '../salle-reservation.model';
import { SalleReservationService } from '../service/salle-reservation.service';

@Component({
  selector: 'salle-reservation-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class SalleReservationListComponent implements OnInit {

  events: any[] = [];
  calendarOptions!: CalendarOptions ;
 
  reservations: SalleReservation[] | undefined ;
  searchText : any ;

  constructor(private reservationService : SalleReservationService) { }

  ngOnInit(): void {
    this.get();

    setTimeout(() => {
      this.calendarOptions = {

       
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
        },
        slotMinTime: "08:00:00",
				slotMaxTime: "22:45:00",
        initialView: 'resourceTimelineDay',
        weekends: true,
        editable: true,
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
        dateClick: this.onDateClick.bind(this),
          events: this.events ,
      };
    }, 2500);
  }
  onDateClick(res:any) {
    alert('Clicked on date : ' + res.dateStr)
  }
  private get() : void {
    this.reservationService.list().subscribe(data=> {
      this.reservations = data ;

      

      for(let res of this.reservations){
      //  console.log(res.date?.getDay());
        const date = res.date!.toString();
        const d = date.split('-');
        //console.log(d)
        const names = [ 'Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        //console.log(new Date(Number(d[0]),Number(d[1]),Number(d[2])).getDay()) ;
        //console.log(Number(d[0]));
        //console.log(Number(d[1]));
        //console.log(Number(d[2]));
        const dayName = names[new Date(Number(d[0]),Number(d[1])-1,Number(d[2])).getDay()];
        let day ;
        if(dayName==='Sunday'){
            day = 0;
        }
        if(dayName==='Monday'){
          day = 1;
         }if(dayName==='Tuesday'){
        day = 2;
        }if(dayName==='Wednesday'){
      day = 3;
       }if(dayName==='Thursday'){
    day = 4;
      }if(dayName==='Friday'){
  day = 5;
      }if(dayName==='Saturday'){
  day = 6;
    }
      
        console.log(dayName);
        this.events.push({
          
          id: res.id,
          title: " ( Salle : " + res.salle?.code + " ) : " + res.description ,
          startRecur:''+d[0]+'-'+d[1]+'-'+d[2]+'',
          daysOfWeek : [day?.toString()],
          startTime : res.creneau?.heureDebut,
          endTime: res.creneau?.heureFin
         
        });
      }
      
    })
  }

  delete(id: number): void {
    this.reservationService.delete(id).subscribe(() => {
     this.get();
    });
  }

}
