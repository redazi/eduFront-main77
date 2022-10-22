export interface IPlannification {
    id?: number;
	 
    description? : String;
    type? : String 
  }

  export class Plannification implements IPlannification {
    constructor(
     public id?: number,
     public description? : String,
     public type? : String 
    ) {}
  }