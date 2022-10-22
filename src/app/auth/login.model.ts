  export interface ILogin {
    username?: string, 
     password?: string
   
  }
  export class Login implements ILogin {
    constructor(
     public username?: string,
     public password?: string
	   
    ) {}
  }
  