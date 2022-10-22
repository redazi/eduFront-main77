import { Client } from "../client/client.model";
import { Creneau } from "../creneau/creneau.model";
import { Formateur } from "../formateur/formateur.model";
import { Matiere } from "../matiere/matiere.model";
import { Reservation } from "../reservation/reservation.model";
import { Salle } from "../salle/salle.model";
import { Utilisateur } from "../utilisateur/utilisateur.model";

export interface IAbsence {
    id?: number;
    client? : Client ;
    reservation? : Reservation ;
    absence? : boolean ;
    
    
	  
   
  }


  export class Absence  implements IAbsence {
    constructor(
        public  id?: number,
        public  client? : Client ,
        public     reservation? : Reservation ,
        public    absence? : boolean ,
     
        
       
    
    ) {}
  }
