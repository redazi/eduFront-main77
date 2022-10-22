import { Component, Inject, OnInit } from '@angular/core';
import { Reservation } from '../reservation.model';
import { ReservationService } from '../service/reservation.service';


import { CalendarOptions } from '@fullcalendar/angular';
import { SalleReservation } from '../../salle-reservation/salle-reservation.model';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReservationUpdateComponent } from '../update/update.component';
import { DateAdapter } from '@angular/material/core';
import { Subject, Subscription } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ReservationListComponent implements OnInit {
  events: any[] = [];
  calendarOptions!: CalendarOptions ;
  day : number | undefined ;
  reservations: Reservation[] | undefined ;
  searchText : any ;
  date : Date |undefined ;
  notifierSubscription: Subscription = this.reservationService.subjectNotifier.subscribe(notified => {
    this.ngOnInit();
  });

  constructor(private reservationService : ReservationService, public dialog: MatDialog) { }

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
        eventClick: this.onEventClick.bind(this)
      };
    }, 1500);
  }

 onEventClick(res:any){
  
  this.openActionsDialog('500ms','500ms',Number(res.event?.id));

 }

  onDateClick(res:any) {
   // alert('Clicked on date : ' + res.dateStr)
   this.date = res.date;
   const date = new Date();
   console.log(date)
   console.log(res.date)
   if(date < res.date || date === res.date){
    this.openDialog('500ms','500ms')
   
   }
   else{
    this.openDialog2('500ms','500ms')
   }
   
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    let dialogRef = this.dialog.open(ReservationUpdateComponent, {
      data : this.date,
      width: '900px',
      enterAnimationDuration,
      exitAnimationDuration,
    });

    dialogRef.afterClosed().subscribe(result => {
     // this.ngOnInit();
     // this.router.navigate(['dashboard/matieres']);
    });
  }

  openDialog2(enterAnimationDuration: string, exitAnimationDuration: string): void {
    let dialogRef = this.dialog.open(ErrorDialogue, {
     
      width: '500px',
      enterAnimationDuration,
      exitAnimationDuration,
    });

    dialogRef.afterClosed().subscribe(result => {
     // this.ngOnInit();
     // this.router.navigate(['dashboard/matieres']);
    });
  }


  openActionsDialog(enterAnimationDuration: string, exitAnimationDuration: string, id:number): void {
    let dialogRef = this.dialog.open(ActionsDialog, {
     data: id ,
      width: '500px',
      enterAnimationDuration,
      exitAnimationDuration,
    });

    dialogRef.afterClosed().subscribe(result => {
     // this.ngOnInit();
     // this.router.navigate(['dashboard/matieres']);
    });
  }



  private get() : void {
    this.reservationService.list().subscribe(data=> {
      this.reservations = data ;
      this.events = [];
      //console.log(data)
      for(let res of data){
        if(res.date!==undefined){
          const date = res.date.toString() ;
          const d = date.split('-');
          //const names = [ 'Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
          //console.log(new Date(Number(d[0]),Number(d[1]),Number(d[2])).getDay()) ;
          //console.log(Number(d[0]));
          //console.log(Number(d[1]));
          //console.log(Number(d[2]));
          //const dayName = names[new Date(Number(d[0]),Number(d[1])-1,Number(d[2])).getDay()];
          
          //if(dayName==='Sunday'){
            //  this.day = 0;
          //}
          //if(dayName==='Monday'){
           // this.day = 1;
           //}if(dayName==='Tuesday'){
            //this.day = 2 ;
          //}if(dayName==='Wednesday'){
           // this.day = 3;
         //}if(dayName==='Thursday'){
         // this.day = 4;
        //}if(dayName==='Friday'){
         // this.day = 5;
        //}if(dayName==='Saturday'){
         // this.day = 6;
      //}
  
      this.events.push({
            
        id: res.id,
        idE : res.plannification?.id,
        title: res.matiere?.nom + " ( Salle : " + res.salle?.code + " )",
        //start:''+d[0]+'-'+d[1]+'-'+d[2]+''
        start: '' + res.date + 'T' + res.creneau?.heureDebut,
        end: '' + res.date + 'T' + res.creneau?.heureFin,
        type : res.plannification?.type ,
        //daysOfWeek : [this.day?.toString()],
       // startTime : res.creneau?.heureDebut,
        //endTime: res.creneau?.heureFin,
        //endRecur : ''+d2[0]+'-'+d2[1]+'-'+d2[2]+''
       
      });
      
      console.log(this.events) ; 
      console.log("test")
        }
         
      }


        
       
        //console.log(d)
        
      
        
        
      
      
    })
    console.log("ok")
  }

  delete(id: number): void {
    this.reservationService.delete(id).subscribe(() => {
     this.get();
    });
  }

  ngOnDestroy() {
    this.notifierSubscription.unsubscribe();
   
  }

}



@Component({
  selector: 'error-dialog',
  templateUrl: 'error-dialog.html',
})
export class ErrorDialogue {
  
  constructor( 
   
   public dialogRef: MatDialogRef<ErrorDialogue>, 

   ){}
  non(){
    this.dialogRef.close();
  } 
}
@Component({
  selector: 'actions-dialog',
  templateUrl: 'actions-dialog.html',
})
export class ActionsDialog {
  
  constructor( 
   public dialog: MatDialog,
   public dialogRef: MatDialogRef<ActionsDialog>, 
   @Inject(MAT_DIALOG_DATA) public data: any,
   ){}

  show(){
    
    this.dialogRef.close();
  }

  update(){
    this.openDialog('500ms','500ms');
    this.dialogRef.close();
  }
  delete2(){
    this.openDialog2('500ms','500ms');
    this.dialogRef.close();
  }

  extend(){
    this.openDialog3('500ms','500ms');
    this.dialogRef.close();
  }


  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    let dialogRef = this.dialog.open(ReservationUpdateComponent, {
      data : this.data,
      width: '900px',
      enterAnimationDuration,
      exitAnimationDuration,
    });

    dialogRef.afterClosed().subscribe(result => {
     // this.ngOnInit();
     // this.router.navigate(['dashboard/matieres']);
    });
  }

  openDialog2(enterAnimationDuration: string, exitAnimationDuration: string): void {
    let dialogRef = this.dialog.open(Actions2Dialog, {
      data : this.data,
      width: '500px',
      enterAnimationDuration,
      exitAnimationDuration,
    });

    dialogRef.afterClosed().subscribe(result => {
     // this.ngOnInit();
     // this.router.navigate(['dashboard/matieres']);
    });
  }

  openDialog3(enterAnimationDuration: string, exitAnimationDuration: string): void {
    let dialogRef = this.dialog.open(ExtendDialog, {
      data : this.data,
      width: '500px',
      enterAnimationDuration,
      exitAnimationDuration,
    });

    dialogRef.afterClosed().subscribe(result => {
     // this.ngOnInit();
     // this.router.navigate(['dashboard/matieres']);
    });
  }
}

  @Component({
    selector: 'actions2-dialog',
    templateUrl: 'actions2-dialog.html',
  })
  export class Actions2Dialog {
    
    constructor( 
      

    @Inject(MAT_DIALOG_DATA) public data: any,
     public dialogRef: MatDialogRef<ActionsDialog>, 
     public reservationService: ReservationService ,
     public dialog: MatDialog
     ){}
  
    one(){
      this.openDialog('500ms','500ms')
      this.dialogRef.close();
    }
    list(){
      this.openDialog2('500ms','500ms')
      this.dialogRef.close();
    }

    

    openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
      this.dialog.open(DeleteDialogue, {
        data : {req :this.data, res : null },
        width: '500px',
        enterAnimationDuration,
        exitAnimationDuration,
      })
      .afterClosed().subscribe(
        data =>  {
          
       
      })
      ;
    }


    openDialog2(enterAnimationDuration: string, exitAnimationDuration: string): void {
      this.dialog.open(DeleteListDialogue, {
        data : {req :this.data, res : null },
        width: '500px',
        enterAnimationDuration,
        exitAnimationDuration,
      })
      .afterClosed().subscribe(
        data =>  {
          
       
      })
      ;
    }

    

  
}


@Component({
  selector: 'delete-dialog',
  templateUrl: 'delete-dialog.html',
})
export class DeleteDialogue {
  errorMsg? : String ;
  succesMsg? : String;
  isDeleteFailed : boolean | undefined ;
  isDeleteSucces : boolean | undefined ;
  resetFormSubject: Subject<boolean> = new Subject<boolean>();
  constructor( 
    
   @Inject(MAT_DIALOG_DATA) public data: any ,
   public reservationService : ReservationService ,
   public dialogRef: MatDialogRef<DeleteDialogue>, 
   private router:Router
   ){}

  non(){
    this.dialogRef.close();
  }
  notifyForChange() {
    this.reservationService.notifyAboutChange();
  }
  confirmer(){
    console.log(this.data)
    this.reservationService.delete(this.data.req).subscribe({
      next : () => {
        this.succesMsg = 'matiere supprimee avec succes' ;
        this.errorMsg = undefined ;
         this.isDeleteFailed=false 
         this.isDeleteSucces=true 
         this.data.res = {
          err: this.errorMsg ,
          suc: this. succesMsg, 
          delF: this.isDeleteFailed,
          delS:this.isDeleteSucces,
          
      }
        this.dialogRef.close(  this.data  )
        this.notifyForChange()
      },
      error:()=>{
        this.succesMsg = undefined ;
        this.errorMsg = 'Cette matiere est inscrite dans une formation' ;
        this.isDeleteFailed = true;
        this.isDeleteSucces=false ; 
        this.data.res = {
          err: this.errorMsg ,
          suc: this. succesMsg, 
          delF: this.isDeleteFailed,
          delS:this.isDeleteSucces
      }
        this.dialogRef.close(  this.data  )
      },
      complete: () => {
        
  }
  
    
   
  })
  
 

     }


     
}





@Component({
  selector: 'deletelist-dialog',
  templateUrl: 'delete-dialog.html',
})
export class DeleteListDialogue {
  errorMsg? : String ;
  succesMsg? : String;
  isDeleteFailed : boolean | undefined ;
  isDeleteSucces : boolean | undefined ;
  reservation :Reservation = new Reservation();
  resetFormSubject: Subject<boolean> = new Subject<boolean>();
  constructor( 
    
   @Inject(MAT_DIALOG_DATA) public data: any ,
   public reservationService : ReservationService ,
   public dialogRef: MatDialogRef<DeleteDialogue>, 
   private router:Router
   ){}

  non(){
    this.dialogRef.close();
  }
  notifyForChange() {
    this.reservationService.notifyAboutChange();
  }
  confirmer(){

    this.reservationService.get(this.data!.req).subscribe( data => {
      this.reservation = data ;

      this.reservationService.deleteList(this.reservation?.plannification!.id).subscribe({
        next : () => {
          this.succesMsg = 'matiere supprimee avec succes' ;
          this.errorMsg = undefined ;
           this.isDeleteFailed=false 
           this.isDeleteSucces=true 
           this.data.res = {
            err: this.errorMsg ,
            suc: this. succesMsg, 
            delF: this.isDeleteFailed,
            delS:this.isDeleteSucces,
            
        }
          this.dialogRef.close(  this.data  )
          this.notifyForChange()
        },
        error:()=>{
          this.succesMsg = undefined ;
          this.errorMsg = 'Cette matiere est inscrite dans une formation' ;
          this.isDeleteFailed = true;
          this.isDeleteSucces=false ; 
          this.data.res = {
            err: this.errorMsg ,
            suc: this. succesMsg, 
            delF: this.isDeleteFailed,
            delS:this.isDeleteSucces
        }
          this.dialogRef.close(  this.data  )
        },
        complete: () => {
          
    }
    
      
     
    })
    }, error => console.log(error))


    console.log(this.data)
   
  
 

     }


     
}


@Component({
  selector: 'extend-dialog',
  templateUrl: 'extend-dialog.html',
})
export class ExtendDialog {
  
  constructor( 
   
   public dialogRef: MatDialogRef<ExtendDialog>, 

   ){}
  non(){
    this.dialogRef.close();
  } 
}