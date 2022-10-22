export interface ISalle {
    id?: number;
    code? : String ;
	  nbrPlace?  : number ;
	  type?  : String;
   
  }
  export class Salle implements ISalle {
    constructor(
     public id?: number,
     public code? : String ,
	   public nbrPlace?  : number ,
	   public type?  : String,  
    ) {}
  }
