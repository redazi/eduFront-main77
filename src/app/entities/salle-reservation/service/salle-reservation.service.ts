import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SalleReservation } from '../salle-reservation.model';

@Injectable({
  providedIn: 'root'
})
export class SalleReservationService {

  private baseURL = "http://localhost:4900/reservation"
  constructor(private httpClient : HttpClient) { }

  list():Observable<SalleReservation[]>{
    return this.httpClient.get<SalleReservation[]>(`${this.baseURL}`);
  }

  add(reservation : SalleReservation) : Observable<Object> {
    return this.httpClient.post(`${this.baseURL}` , reservation);
  }

  get(id:number):Observable<SalleReservation>{
    return this.httpClient.get<SalleReservation>(`${this.baseURL}/${id}`)
  }
  update(id:number , reservation: SalleReservation): Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/${id}`,reservation)
  }
  delete(id: number): Observable<Object> {
    return this.httpClient.get(`${this.baseURL}/delete/${id}`);
  }
}
