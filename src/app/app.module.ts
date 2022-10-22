import { NgModule , CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FullCalendarModule } from '@fullcalendar/angular';  
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { SalleListComponent } from './entities/salle/list/list.component';

import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import {NgxWebstorageModule} from 'ngx-webstorage';

import { HttpClientModule } from '@angular/common/http';
import { SalleUpdateComponent } from './entities/salle/update/update.component';
import { FormationListComponent } from './entities/formation/list/list.component';
import { MatiereListComponent } from './entities/matiere/list/list.component';
import { MatiereUpdateComponent } from './entities/matiere/update/update.component';
import { FormationUpdateComponent } from './entities/formation/update/update.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { FormMatiereUpdateComponent } from './entities/form-matiere/update/update.component';
import { MatSelectModule} from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule} from '@angular/material/card';
import { FormationDetailComponent } from './entities/formation/detail/detail.component';
import { NavbarComponent, SignInDialog, SignUpDialog } from './layouts/navbar/navbar.component';
import { SliderComponent } from './layouts/slider/slider.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { MainComponent } from './layouts/main/main.component';

import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule} from '@angular/material/button';
import { MatDialogModule} from '@angular/material/dialog';
import { MatInputModule} from '@angular/material/input';
import { HomeComponent } from './home/home/home.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from './auth/auth.guard';
import { DashboardComponent } from './layouts/dashboard/dashboard.component';
import { DashhomeComponent } from './layouts/dashboard/dashhome/dashhome.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { MatiereDetailComponent } from './entities/matiere/detail/detail.component';
import { RevueListComponent } from './entities/revue/list/list.component';
import { RevueUpdateComponent } from './entities/revue/update/update.component';
import { ReservationListComponent } from './entities/reservation/list/list.component';
import { ReservationUpdateComponent } from './entities/reservation/update/update.component';
import { CreneauListComponent } from './entities/creneau/list/list.component';
import { CreneauUpdateComponent } from './entities/creneau/update/update.component';
import { TimePickerComponent } from './layouts/time-picker/time-picker.component';
import { Calendar } from '@fullcalendar/core'

import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { SalleReservationListComponent } from './entities/salle-reservation/list/list.component';
import { AbsenceinfoListComponent } from './entities/absenceinfo/list/list.component';
import { AbsenceinfoUpdateComponent } from './entities/absenceinfo/update/update.component';
import { HistoriqueComponent } from './entities/absenceinfo/historique/historique.component';
import { HistoriqueinfoComponent } from './entities/absenceinfo/historiqueinfo/historiqueinfo.component';
import { ClientListComponent } from './entities/client/list/list.component';
import { ClientUpdateComponent } from './entities/client/update/update.component';
import { FormateurListComponent } from './entities/formateur/list/list.component';
import { FormateurUpdateComponent } from './entities/formateur/update/update.component';
import { PanierUpdateComponent } from './entities/panier/update/update.component';
import { PanierListComponent } from './entities/panier/list/list.component';


FullCalendarModule.registerPlugins([ 
  interactionPlugin,
  dayGridPlugin,
  resourceTimelinePlugin,
  timeGridPlugin,
  listPlugin
]);





@NgModule({
  
  declarations: [
    AppComponent,
    TimePickerComponent,
    NavbarComponent,
    SliderComponent,
    FooterComponent,
    MainComponent,
    SignInDialog,
    SignUpDialog,

    HomeComponent,

    SalleListComponent,
    SalleUpdateComponent ,

    MatiereListComponent,
    MatiereUpdateComponent,
    MatiereDetailComponent,

    FormationListComponent,
    FormationUpdateComponent,
    FormationDetailComponent,

    FormMatiereUpdateComponent,

    RevueListComponent,
    RevueUpdateComponent,


    ReservationListComponent,
    ReservationUpdateComponent,

    CreneauListComponent,
    CreneauUpdateComponent,

    SalleReservationListComponent,
    
     HomeComponent,
     DashboardComponent,
     DashhomeComponent,
     AbsenceinfoListComponent,
     AbsenceinfoListComponent,
     AbsenceinfoUpdateComponent,
     HistoriqueComponent,
     HistoriqueinfoComponent,
     ClientListComponent,
     ClientUpdateComponent,
     FormateurListComponent ,
     FormateurUpdateComponent ,
     PanierUpdateComponent,
     PanierListComponent,
 
  ],
  imports: [
    FullCalendarModule,
    BrowserModule,
   
    
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    NgbModule,
    HttpClientModule,
    NgMultiSelectDropDownModule,
    MatSelectModule,
    BrowserAnimationsModule,
    MatCardModule,
    NgxMaterialTimepickerModule,
    MatToolbarModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    NgxWebstorageModule.forRoot(),


    
  
    
  ],
  providers: [AuthGuard,{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
