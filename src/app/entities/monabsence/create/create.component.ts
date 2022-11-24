import { Component, OnInit } from '@angular/core';
import { AbsenceinfoService } from '../../absenceinfo/service/absenceinfo.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class MonbsenceComponent implements OnInit {
absenceinfos: any;
  constructor(private absenceinfoService : AbsenceinfoService) { }

  ngOnInit(): void {
    this.get();
  }
  private get() : void {
    this.absenceinfoService.absenceinfobyclient().subscribe(data=> {

      this.absenceinfos = data ;
      //console.log(this.absenceinfos.lenght);
    })
  }
}
