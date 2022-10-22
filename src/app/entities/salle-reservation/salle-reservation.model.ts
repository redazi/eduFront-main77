import { Creneau } from "../creneau/creneau.model";
import { Formateur } from "../formateur/formateur.model";
import { Salle } from "../salle/salle.model";
import { Utilisateur } from "../utilisateur/utilisateur.model";

export interface ISalleReservation {
    id?: number;
    salle? : Salle ;
	  creneau?  : Creneau;
    utilisateur? : Utilisateur;
    description? : String;
    date? : Date;
   
  }
  export class SalleReservation implements ISalleReservation {
    constructor(
     public id?: number,
     public salle? : Salle ,
	   public creneau?  : Creneau ,
     public utilisateur? : Utilisateur,
    public date? : Date,
    public description? : String 
    ) {}
  }
