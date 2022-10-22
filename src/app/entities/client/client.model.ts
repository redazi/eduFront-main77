import { Utilisateur } from "../utilisateur/utilisateur.model";

export interface IClient {
    id?: number;
    nom? : String ;
    userName? : String ;
    password? : String ;
    prenom?  : number ;
    age?  : number;
    email?  : String;
    cin?  : String;
    active? : boolean ;
	  picByte?  : string ;
   
  }


  export class Client  implements IClient  {
    constructor(
        public  id?: number,
        public nom? : String ,
        
        public userName? : String ,
        
        public password? : String ,
        public  prenom?  : number ,
        public age?  : number,
        public email?  : String,
        public cin?  : String,
    public active? : boolean ,
    public picByte?  : string ,
        
    
    ) {}
  }
