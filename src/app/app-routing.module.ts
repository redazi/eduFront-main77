import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { HistoriqueComponent } from './entities/absenceinfo/historique/historique.component';
import { HistoriqueinfoComponent } from './entities/absenceinfo/historiqueinfo/historiqueinfo.component';
import { AbsenceinfoListComponent } from './entities/absenceinfo/list/list.component';
import { AbsenceinfoUpdateComponent } from './entities/absenceinfo/update/update.component';
import { ClientListComponent } from './entities/client/list/list.component';
import { ClientUpdateComponent } from './entities/client/update/update.component';
import { CreneauListComponent } from './entities/creneau/list/list.component';
import { CreneauUpdateComponent } from './entities/creneau/update/update.component';

import { FormMatiereUpdateComponent } from './entities/form-matiere/update/update.component';
import { FormateurListComponent } from './entities/formateur/list/list.component';
import { FormateurUpdateComponent } from './entities/formateur/update/update.component';
import { FormationDetailComponent } from './entities/formation/detail/detail.component';
import { FormationListComponent } from './entities/formation/list/list.component';
import { FormationUpdateComponent } from './entities/formation/update/update.component';
import { MatiereDetailComponent } from './entities/matiere/detail/detail.component';
import { MatiereListComponent } from './entities/matiere/list/list.component';
import { MatiereUpdateComponent } from './entities/matiere/update/update.component';
import {  MonbsenceComponent } from './entities/monabsence/create/create.component';
import { PanierListComponent } from './entities/panier/list/list.component';
import { PanierUpdateComponent } from './entities/panier/update/update.component';
import { PlanificationCreateComponent } from './entities/planification/create/create.component';
import { ListeetudiantComponent } from './entities/reservation-etudiant/listeetudiant/listeetudiant.component';
import { ListereservationComponent } from './entities/reservation-etudiant/listereservation/listereservation.component';
import { ReservationListComponent } from './entities/reservation/list/list.component';
import { ReservationUpdateComponent } from './entities/reservation/update/update.component';
import { SalleReservationListComponent } from './entities/salle-reservation/list/list.component';
import { SalleListComponent } from './entities/salle/list/list.component';
import { SalleUpdateComponent } from './entities/salle/update/update.component';
import { HomeComponent } from './home/home/home.component';
import { DashboardComponent } from './layouts/dashboard/dashboard.component';
import { DashhomeComponent } from './layouts/dashboard/dashhome/dashhome.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {path:"home" , component :  HomeComponent },
  {path:"dashboard" , component :  DashboardComponent , canActivate: [AuthGuard],
  children: [
    {
      path: '',
      component: DashhomeComponent,
    },
    {
      path: 'matieres',
      component: MatiereListComponent,
    },
    {
      path: 'matiere',
      component: MatiereUpdateComponent,
    },
    {
      path: 'matiere/:id',
      component: MatiereUpdateComponent,
    },
    {
      path: 'matiere/:id/details',
      component: MatiereDetailComponent,
    },
    {
      path: 'formations',
      component: FormationListComponent,
    },
    {
      path: 'formatieres',
      component: FormationUpdateComponent,
    },
    {
      path: 'formation/:id',
      component: FormationUpdateComponent,
    },
    {
      path: 'formation/:id/view',
      component: FormationDetailComponent,
    },
    {
      path: 'salles',
      component: SalleListComponent,
    },
    {
      path: 'ajouterSalle',
      component: SalleUpdateComponent,
    },
    {
      path: 'salle/:id',
      component: SalleUpdateComponent,
    },
    {
      path: 'reservations',
      component: ReservationListComponent,
    },
    {
      path: 'ajouterReservation',
      component: ReservationUpdateComponent,
    },
    {
      path: 'creneaux',
      component: CreneauListComponent,
    },
    {
      path: 'sallesreservation',
      component: SalleReservationListComponent,
    },   {
      path: 'planification',
      component: PlanificationCreateComponent,
    },  
    {
      path: 'monabsence',
      component: MonbsenceComponent,
    },
    {
      path: 'listeetudiant/:id',
      component: ListeetudiantComponent,
    }
    ,
    {
      path: 'listereservation',
      component: ListereservationComponent,
    }
    ,
    {path:"formateur" , component :  FormateurListComponent },
    {path:"ajouterFormateur" , component : FormateurUpdateComponent } ,
    {path: 'formateur/:id', component:FormateurUpdateComponent},
    {
      path: 'ajouterCreneau',
      component: CreneauUpdateComponent,
    },{path:"clients" , component :  ClientListComponent },
    {path:"ajouterClient" , component :  ClientUpdateComponent } ,
    {path: 'client/:id', component: ClientUpdateComponent},
     {path:"absenceinfo" , component :  AbsenceinfoListComponent },
    {path:"ajouterabsenceinfo/:id" , component :  AbsenceinfoUpdateComponent } ,
    {path: 'absenceinfo/:id', component: AbsenceinfoUpdateComponent},
    {path: 'historique', component: HistoriqueComponent},
    {path: 'historiqueinfo/:id', component: HistoriqueinfoComponent},
    {path:"panier" , component :  PanierListComponent },
    {path:"ajouterpanier" , component :  PanierUpdateComponent } ,
    {path: 'panier/:id', component: PanierUpdateComponent},
  ]
},
  {path:"salles" , component :  SalleListComponent },
  {path:"ajouterSalle" , component :  SalleUpdateComponent } ,
  {path: 'salle/:id', component: SalleUpdateComponent},

  {path: 'matieres', component: MatiereListComponent},
  {path: 'matieres/:id', component: MatiereUpdateComponent},
  {path:"ajouterMatiere" , component :  MatiereUpdateComponent } ,

  {path: 'formations', component: FormationListComponent},
  {path: 'formation/:id/view', component: FormationDetailComponent},
  {path: 'formation/:id', component: FormationUpdateComponent},
  {path:"ajouterFormation" , component :  FormationUpdateComponent} ,

  {path:"formatieres" , component :  FormMatiereUpdateComponent} ,
  


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
