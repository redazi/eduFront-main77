export interface IUtilisateur {
    id?: number;
    nom? : String ;
    userName? : String ;
    password? : String ;
    prenom?  : number ;
    age?  : number;
    email?  : String;
    cin?  : String;
  }


  export class Utilisateur implements IUtilisateur {
    constructor(
        public  id?: number,
        public nom? : String ,
        
        public userName? : String ,
        
        public password? : String ,
        public  prenom?  : number ,
        public age?  : number,
        public email?  : String,
        public cin?  : String,
    
    ) {}
  }