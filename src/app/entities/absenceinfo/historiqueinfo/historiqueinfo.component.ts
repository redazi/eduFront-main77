import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from '../../client/service/client.service';
import { Absenceinfo } from '../absenceinfo.model';
import { AbsenceinfoService } from '../service/absenceinfo.service';

@Component({
  selector: 'app-historiqueinfo',
  templateUrl: './historiqueinfo.component.html',
  styleUrls: ['./historiqueinfo.component.css']
})
export class HistoriqueinfoComponent implements OnInit {
  id!: number;
  absenceinfos!: Absenceinfo[] ;
  
  retrievedImage : any;
  data1: number | undefined;
  constructor(public absenceService : AbsenceinfoService,public clientService : ClientService,public dialog: MatDialog,private router : Router, protected fb: UntypedFormBuilder,public activeroute : ActivatedRoute ) { }

  ngOnInit(): void {
    this.id =this.activeroute.snapshot.params["id"];
this.getAbsencebyreservation();
  }
  private getAbsencebyreservation() : void {
    this.absenceService.absenceinfobyreservation(this.id).subscribe(data=> {
    this.absenceinfos = data ;
    this.absenceinfos.forEach((element, index) => {
      console.log("tesst"+element?.client?.picByte)  

      this.retrievedImage = 'data:image/jpeg;base64,' +element?.client?.picByte;
      this.absenceinfos[index].client!.picByte = this.retrievedImage; 
      this.absenceinfos[index].id = 1;
      console.log(element.client?.nom + " : "+this.retrievedImage);

    });
    console.log(this.absenceinfos);
    })
  }


  }

 