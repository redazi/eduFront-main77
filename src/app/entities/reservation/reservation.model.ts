import { Creneau } from "../creneau/creneau.model";
import { Formateur } from "../formateur/formateur.model";
import { Matiere } from "../matiere/matiere.model";
import { SalleReservation } from "../salle-reservation/salle-reservation.model";
import { Salle } from "../salle/salle.model";
import { Utilisateur } from "../utilisateur/utilisateur.model";
import { Plannification } from "./plannification.model";

export interface IReservation {
    id?: number;
	  matiere?  : Matiere;
    formateur?  : Formateur;
    datefin? : Date;
    salle? : Salle ;
	  creneau?  : Creneau;
    utilisateur? : Utilisateur;
    description? : String;
    date? : Date;
    plannification? : Plannification
    
   
  }
  export class Reservation implements IReservation {
    constructor(
     public id?: number,
     public salle? : Salle ,
     public creneau?  : Creneau,
     public utilisateur? : Utilisateur,
     public description? : String,
     public date? : Date,
	   public matiere?  : Matiere, 
     public formateur?  : Formateur,
     public datefin? : Date,
     public plannification? : Plannification
     
    ) {}
  }
