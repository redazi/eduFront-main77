import { Formation } from "../formation/formation.model";
import { Matiere } from "../matiere/matiere.model";

export interface IFormMatiere {
    id? :number ;
	formation? : Formation ;
	matiere? : Matiere 
  }
export class FormMatiere implements IFormMatiere {
    constructor(
        public id? :number ,
	    public formation? : Formation ,
	    public matiere? : Matiere 
       ) {}
}
