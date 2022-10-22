import { Time } from "@angular/common";

export interface ICreneau {
    id?: number;
    heureDebut? : String ;
    heureFin? : String ;
	  
   
  }
  export class Creneau  implements ICreneau  {
    constructor(
        public  id?: number,
        public heureDebut? : String ,
        
        public heureFin? : String ,
        
        
    
    ) {}
  }