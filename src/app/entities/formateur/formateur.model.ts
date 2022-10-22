export interface IFormateur {
    id?: number;
    nom? : String ;
    userName? : String ;
    password? : String ;
    prenom?  : number ;
    age?  : number;
    email?  : String;
    cin?  : String;
    salaire? : number;
    dernierPaiement?: Date;
    picByte?  : string ;
  }


  export class Formateur  implements IFormateur {
    constructor(
        public  id?: number,
        public nom? : String ,
        
        public userName? : String ,
        
        public password? : String ,
        public  prenom?  : number ,
        public age?  : number,
        public email?  : String,
        public cin?  : String,
        public salaire?  : number,
        
   public dernierPaiement?: Date ,
   public picByte?  : string ,

        
    
    ) {}
  }
