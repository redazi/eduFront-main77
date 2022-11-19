import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { CalendarOptions } from '@fullcalendar/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Subject, Subscription } from 'rxjs';
import { Absenceinfo } from '../../absenceinfo/absenceinfo.model';
import { AbsenceinfoService } from '../../absenceinfo/service/absenceinfo.service';
import { Client } from '../../client/client.model';
import { ClientService } from '../../client/service/client.service';
import { Formation } from '../../formation/formation.model';
import { FormationService } from '../../formation/service/formation.service';
import { Actions2Dialog, ExtendDialog } from '../../reservation/list/list.component';
import { Plannification } from '../../reservation/plannification.model';
import { Reservation } from '../../reservation/reservation.model';
import { ReservationService } from '../../reservation/service/reservation.service';
import {  ReservationUpdateComponent } from '../../reservation/update/update.component';
import { IPanier, Panier } from '../panier.model';
import { PanierService } from '../service/panier.service';
@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: 'succes-alert-dialog.html',
})
export class SuccessAlertDialog {
  constructor(public dialogRef: MatDialogRef<SuccessAlertDialog>) {

  }

  closeDialog() {
    //Write your stuff here
    this.dialogRef.close(); // <- Closes the dialog
  }
}

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})

export class PanierUpdateComponent implements OnInit {
  day : number | undefined ;
  reservations: Reservation[] | undefined ;
  searchText : any ;
  date : Date |undefined ;
  notifierSubscription: Subscription = this.reservationService.subjectNotifier.subscribe(notified => {
    this.ngOnInit();
  });
  sClient : Client = new Client();
  idc : number | any ;
  events: any[] = [];
  dropdownList :any = [];
  selectedItems :any = [];
  dropdownSettings :IDropdownSettings={};
  clients : Client[] | undefined;
  paniers : Panier[]| undefined;
  formations : Formation[] | undefined;
  panier1  : Panier = new Panier();
  panier  : Panier = new Panier();
  id!: number;
  resetFormSubject: Subject<boolean> = new Subject<boolean>();

  notifierSubscription3: Subscription = this.panierService.subjectNotifier.subscribe(notified => {
    this.ngOnInit();
  });
  notifierSubscription2: Subscription = this.panierService.subjectNotifier.subscribe(notified => {
    this.ngOnInit();
  });
  editForm = this.fb.group({
    id: [],
    client: [],
    formation: [],
    
   

  });
  selectedItemsRoot: any[] | undefined;
calendarOptions: CalendarOptions|undefined;

  constructor(private reservationService : ReservationService, private formationservice : FormationService ,public dialog: MatDialog,private router : Router,private panierService : PanierService,private formationService : FormationService,private clientService : ClientService, protected fb: UntypedFormBuilder , protected activatedRoute : ActivatedRoute) { }
  compareObjects(o1: any, o2: any): boolean {
    return o1.id === o2.id && o1.nom === o2.nom;
  }
  onChange(e? : MatSelectChange):void {
    console.log(e?.value.id)
    this.idc=e?.value.id;
    this.getFormations(e?.value.id);
   
  }
  /*private getUser() : void {
    this.panierService.getuserzz.subscribe(data=> {
      this.matieres = data ;
    })
  }*/
  ngOnInit(): void {
    //console.log("raw3aaaaaaaaaaaaa : "+this.currentUser.id);    
  
   // console.log("raw3aaaaaaaaaaaaa : "+this.currentUser.id);

       
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
       // dateClick: this.onDateClick.bind(this),
        events: this.events ,
        eventClick: this.onEventClick.bind(this)
      };
    }, 1500);
    this.selectedItemsRoot = [];
    this.clientService.get(this.idc).subscribe( data => {
      this.sClient = data ;
      this.getFormations(this.sClient.id);
     this.updateForm(this.sClient)
      console.log(this.sClient.nom);
      console.log(this.idc);
    }, error => console.log(error))

    
    this.getClients();
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
  onEventClick(res:any){
  console.log(res.event?.id);
  this.reservationService.getplanification(res.event?.id).subscribe(data=>{

    const planification1 = data;
    this.panierService.checkIfDejaExistist(planification1.id!).subscribe(data=>{

      paniers = data;
       if()
    })
    



  });
    //this.openActionsDialog('500ms','500ms',Number(res.event?.id));
  
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
       
      this.events.push({
            
        id: res.id,
        idE : res.plannification?.id,
        title: res.matiere?.nom + " ( Salle : " + res.salle?.code + " )",
        //start:''+d[0]+'-'+d[1]+'-'+d[2]+''
        start: '' + res.date + 'T' + res.creneau?.heureDebut,
        end: '' + res.date + 'T' + res.creneau?.heureFin,
        type : res.plannification?.type ,
        
       
      });
      
      console.log(this.events) ; 
      console.log("test")
        }
         
      }


      
    })
    console.log("ok")
  }

  getFormations(id? : number):void{
    this.formationService.notinlist(id!).subscribe( data => {
      this.dropdownList = data;
    }, error => console.log(error))
  }
  getClients():void{
    this.clientService.list().subscribe( data => {
      this.clients = data;
    }, error => console.log(error))
  }
  
  protected updateForm(panier: IPanier): void {
    this.editForm.patchValue({
      id: panier.id,
      client: panier.client,
      planification : panier.planification,
      
     
    });
  }
  notifyForChange() {
    this.panierService.notifyAboutChange();
  }
  
  save():void{
  /*  this.panierService.getuser().subscribe(data=> {
      this.currentUser = data;
      console.log("raw3aaaaaaaaaaaaa : "+this.currentUser.id);
          });
   */
   /*
    if(this.editForm.get(['id'])!.value === undefined ) { 
      this.panierService.add(this.panier).subscribe(data =>{
        this.openDialog('500ms', '500ms');
        console.log(data);
      },
      error => console.log(error)
      );
    }
   else{
    this.panierService.update(this.id,this.panier).subscribe(data =>{
      console.log(data);
      this.router.navigate(['/dashboard/panier'])
      this.openDialog('500ms', '500ms');

    },
    error => console.log(error)
    )
   }

   */
  }
  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    let dialogRef = this.dialog.open(SuccessAlertDialog, {
      width: '500px',
      enterAnimationDuration,
      exitAnimationDuration,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.router.navigate(['dashboard/matieres']);
    });
  }
  protected createFromForm(p : Plannification): Panier {
    return {
      ...new Panier(),
      id: this.editForm.get(['id'])!.value,
      client : this.editForm.get(['client'])!.value,

      planification : p,
      
     
    
    };
  }
  

}

@Component({
  selector: 'actions-dialog',
  templateUrl: 'actions-dialog.html',
})
export class ActionsDialog {
  panier  : Panier = new Panier();

  currentUser : Client = new Client;
 reservation : Reservation | undefined;
  constructor( 
   public dialog: MatDialog,
   public dialogRef: MatDialogRef<ActionsDialog>, protected fb: UntypedFormBuilder,public panierService: PanierService,public reservationService: ReservationService,public absenceinfService : AbsenceinfoService,
   @Inject(MAT_DIALOG_DATA) public data: any,
   ){}
   editForm = this.fb.group({
    id: [],
    client: [],
    formation: [],
    
   

  });
  save():void{
    //idp : Number;


    
    this.reservationService.get(this.data).subscribe( data => {
      this.reservation = data ;
      this.panierService.getuser().subscribe(data=> {
        this.currentUser = data;
    //    this.panier.client=this.currentUser;
    const idp=this.reservation!.plannification?.id;
console.log("idp : "+idp);
      this.reservationService.getplanification(idp).subscribe(data=>{
        const planification = data;
        console.log("planif : "+planification.type);
        console.log("raaaaaaaa : "+this.reservation?.salle?.code)
        console.log("raw3aaaaaaaaaaaaa : "+this.currentUser.userName);
        this.panier.client=this.currentUser;
        this.panier.planification=planification;
        
        this.panierService.add(this.panier).subscribe(data =>{
          this.reservationService.listPlanif(this.panier.planification?.id).subscribe( data => {
            let reservations = data 
            for(var r of reservations){
              const absenceinfo = new Absenceinfo();
              absenceinfo.client=this.currentUser;
              absenceinfo.reservation=r;
              this.absenceinfService.add(absenceinfo).subscribe(data =>{
                console.log(data);
              
              },
              error => console.log(error)
              )
            }
            this.openDialog('500ms','500ms')
          }, error => console.log(error))
          console.log(data);
          this.openDialog('500ms','500ms');
  
        },
        error => console.log(error)
        )

        
      })
     
            });
            console.log(this.panier.client?.id);
            console.log(this.panier.planification?.id);

    /* 
      this.panierService.add(this.panier).subscribe(data =>{
        console.log(data);
        this.openDialog('500ms','500ms');

      },
      error => console.log(error)
      )*/
     /* this.reservationService.listPlanif(this.reservation.plannification?.id).subscribe( data => {
        let reservations = data 
        for(var r of reservations){
          this.absenceinfService.add(this.reservation).subscribe(data =>{
            console.log(data);
            this.notifyForChange();
           
            
            this.closeDialog();
          },
          error => console.log(error)
          )
        }
        this.openDialog('500ms','500ms')
      }, error => console.log(error))
*/
    console.log("planification id "+this.reservation.plannification?.id)
    console.log("ezfezfezfezfez : "+this.data)

    });
   
   
   
    //console.log("hanaaaaaaaaaaaa : " +this.editForm.get(['id'])!.value);
   /*
    if(this.editForm.get(['id'])!.value === undefined ) { 
      this.panierService.add(this.panier).subscribe(data =>{
        this.openDialog('500ms', '500ms');
        console.log(data);
      },
      error => console.log(error)
      );
    }
   else{
    this.panierService.update(this.id,this.panier).subscribe(data =>{
      console.log(data);
      this.router.navigate(['/dashboard/panier'])
      this.openDialog('500ms', '500ms');

    },
    error => console.log(error)
    )
   }

   */
  }
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
    let dialogRef = this.dialog.open(SuccessAlertDialog, {
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
