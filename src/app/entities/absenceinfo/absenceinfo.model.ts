import { Client } from "../client/client.model";
import { Formateur } from "../formateur/formateur.model";
import { Matiere } from "../matiere/matiere.model";
import { Reservation } from "../reservation/reservation.model";

export interface IAbsenceinfo {
    id?: number;
    client? : Client ;

    reservation? : Reservation;
    status? : String;
    
	  
   
  }


  export class Absenceinfo  implements IAbsenceinfo {
    constructor(
        public  id?: number,
        public  client? : Client ,
    
        public  reservation? : Reservation,
        public status? : String,
        
       
    
    ) {}
  }
