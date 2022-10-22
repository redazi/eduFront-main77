import { Matiere } from "../matiere/matiere.model";
import { Utilisateur } from "../utilisateur/utilisateur.model";

export interface IRevue {

    id?: number;
    utilisateur? : Utilisateur ;
	matiere?  : Matiere;
    date? : Date ;
    commentaire? : String ;
   
  }
  export class Revue implements IRevue {
    constructor(
     public id?: number,
     public utilisateur? : Utilisateur,
     public matiere?  : Matiere,
     public date? : Date ,
     public commentaire? : String 
    ) {}
  }

