import { Matiere } from "../matiere/matiere.model";

export interface IFormation {
    id? :number ;
	nom? : String ;
  description? : String ;
	matieres? : Matiere[] ;
  }
export class Formation implements IFormation {
    constructor(
        public id? :number ,
	    public nom? : String ,
      public description? : String ,
	    public matieres?: Matiere[] ,
       ) {}
}
