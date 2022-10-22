
export interface IMatiere {
    id?: number;
    nom? : String ;
	  libelle?  : String ;
	  description? : String 
   
  }
  export class Matiere implements IMatiere {
    constructor(
     public id?: number,
     public nom? : String  ,
	   public libelle?  : String ,
	   public  description? : String 
    ) {}
  }