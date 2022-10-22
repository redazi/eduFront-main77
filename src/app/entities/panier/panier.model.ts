import { Client } from "../client/client.model";
import { Formation } from "../formation/formation.model";
import { Reservation } from "../reservation/reservation.model";

export interface IPanier {
    id?: number;
   client?:Client;
   formation? : Formation;
  }

export class Panier implements IPanier {
    constructor(  
        public id?: number,
   public client? : Client,

   public formation? : Formation,
   ) {}
}
