import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Salle } from '../salle.model';

@Injectable({
  providedIn: 'root'
})
export class SalleService {

  private baseURL = "http://localhost:4900/salle"
  constructor(private httpClient : HttpClient) { }

  list():Observable<Salle[]>{
    return this.httpClient.get<Salle[]>(`${this.baseURL}`);
  }

  add(salle : Salle) : Observable<Object> {
    return this.httpClient.post(`${this.baseURL}` , salle);
  }

  get(id:number):Observable<Salle>{
    return this.httpClient.get<Salle>(`${this.baseURL}/${id}`)
  }
  update(id:number , salle: Salle): Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/${id}`,salle)
  }
  delete(id: number): Observable<Object> {
    return this.httpClient.get(`${this.baseURL}/delete/${id}`);
  }
}
