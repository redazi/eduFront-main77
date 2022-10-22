export interface IRegister {
     username?: string, 
     email?:string ,
     nom ? : string ,
     prenom? : string ,
     age? : number,
    cin? : string ,
     password?: string
    
   
  }
  export class Register implements IRegister {
    constructor(
     public username?: string,
     public email?:string ,
     public nom ? : string ,
     public prenom? : string ,
     public age? : number,
     public cin? : string ,
     public password?: string,
     
	   
    ) {}
  }