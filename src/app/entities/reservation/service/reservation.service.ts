import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { SalleReservation } from '../../salle-reservation/salle-reservation.model';
import { Reservation } from '../reservation.model';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  subjectNotifier: Subject<null> = new Subject<null>();
  private baseURL = "http://localhost:4900/reservation"
  constructor(private httpClient : HttpClient) { }

  list():Observable<Reservation[]>{
    return this.httpClient.get<Reservation[]>(`${this.baseURL}`);
  }

  listPlanif(id?:number):Observable<Reservation[]>{
    return this.httpClient.get<Reservation[]>(`${this.baseURL}/list/${id}`);
  }
  add(reservation : Reservation ) : Observable<Object> {

    return this.httpClient.post(`${this.baseURL}` , reservation );
  }

  extend(reservation : Reservation ) : Observable<Object> {

    return this.httpClient.post(`${this.baseURL}/extend` , reservation );
  }

  get(id:number):Observable<Reservation>{
    return this.httpClient.get<Reservation>(`${this.baseURL}/${id}`)
  }
  update(id?:number , reservation?: Reservation): Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/${id}`,reservation)
  }

  updateList(id?:number , reservation?: Reservation): Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/list/${id}`,reservation)
  }

  delete(id: number): Observable<Object> {
    return this.httpClient.get(`${this.baseURL}/delete/${id}`);
  }

  deleteList(id?: number): Observable<Object> {
    return this.httpClient.get(`${this.baseURL}/deleteList/${id}`);
  }
  notifyAboutChange() {
    this.subjectNotifier.next(null);
  }
}
