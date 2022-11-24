import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Absenceinfo } from '../../absenceinfo/absenceinfo.model';
import { AbsenceinfoService } from '../../absenceinfo/service/absenceinfo.service';
import { ClientService } from '../../client/service/client.service';

@Component({
  selector: 'app-listeetudiant',
  templateUrl: './listeetudiant.component.html',
  styleUrls: ['./listeetudiant.component.css']
})
export class ListeetudiantComponent implements OnInit {
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
    console.log("ana hna db");
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
