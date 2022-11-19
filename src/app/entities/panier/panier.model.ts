import { Client } from "../client/client.model";
import { Formation } from "../formation/formation.model";
import { Plannification } from "../reservation/plannification.model";
import { Reservation } from "../reservation/reservation.model";

export interface IPanier {
    id?: number;
   client?:Client;
   planification? : Plannification;
   reservations? : Reservation[];
  }

export class Panier implements IPanier {
    constructor(  
        public id?: number,
   public client? : Client,
   public reservations? : Reservation[],
   public planification? : Plannification,
   ) {}
}
