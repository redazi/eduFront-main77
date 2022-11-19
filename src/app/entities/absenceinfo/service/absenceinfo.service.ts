import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../../client/client.model';
import { Reservation } from '../../reservation/reservation.model';
import { Absenceinfo } from '../absenceinfo.model';

@Injectable({
  providedIn: 'root'
})
export class AbsenceinfoService {



  private baseURL = "http://localhost:4900/absenceInfo"
  constructor(private httpClient : HttpClient) { }

  list():Observable<Absenceinfo[]>{
    return this.httpClient.get<Absenceinfo[]>(`${this.baseURL}`);
  }
  checkUnmarkedAbsence(id:number):Observable<Absenceinfo[]>{
    return this.httpClient.get<Absenceinfo[]>(`${this.baseURL}/checkunmarkedabsence/${id}`);
  }
  listEtudiant(id:number):Observable<Client[]>{
    return this.httpClient.get<Client[]>(`${this.baseURL}/listeEtudiant/${id}`);
  }
  updateabsence(id:number,client : Client):Observable<object>{
    return this.httpClient.put(`http://localhost:4900/absenceInfo/status/${id}`,client);
  }
  listReservation():Observable<Reservation[]>{
    return this.httpClient.get<Reservation[]>(`${this.baseURL}/listeReservation`);
  }
  listReservationvalide():Observable<Reservation[]>{
    return this.httpClient.get<Reservation[]>(`${this.baseURL}/listeReservationvalide`);
  }
  add(absence : Absenceinfo) : Observable<Object> {
    return this.httpClient.post(`${this.baseURL}` , absence);
  }
  absenceinfobyreservation(id:number):Observable<Absenceinfo[]>{
    return this.httpClient.get<Absenceinfo[]>(`${this.baseURL}/absenceinfobyreservation/${id}`);
  }
  
  updateabsencevalidation(id:number):Observable<object>{
    return this.httpClient.get(`${this.baseURL}/updatevalidation/${id}`);
  }
  get(id:number):Observable<Absenceinfo>{
    return this.httpClient.get<Absenceinfo>(`${this.baseURL}/${id}`)
  }
  update(id:number , absence: Absenceinfo): Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/${id}`,absence)
  }
  delete(id: number): Observable<Object> {
    return this.httpClient.get(`${this.baseURL}/delete/${id}`);
  }
}
