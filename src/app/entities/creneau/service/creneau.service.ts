import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Salle } from '../../salle/salle.model';
import { Creneau } from '../creneau.model';

@Injectable({
  providedIn: 'root'
})
export class CreneauService {

  private baseURL = "http://localhost:4900/creneau"
  constructor(private httpClient : HttpClient) { }

  list():Observable<Creneau[]>{
    return this.httpClient.get<Creneau[]>(`${this.baseURL}`);
  }

  add(creneau : Creneau) : Observable<Object> {
    return this.httpClient.post(`${this.baseURL}` , creneau);
  }

  dispo(s? : Salle , d? : Date ) : Observable<any> {
    return this.httpClient.post(`${this.baseURL}/dispo` , {s,d} );
  }

  get(id:number):Observable<Creneau>{
    return this.httpClient.get<Creneau>(`${this.baseURL}/${id}`)
  }
  update(id:number , creneau: Creneau): Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/${id}`,creneau)
  }
  delete(id: number): Observable<Object> {
    return this.httpClient.get(`${this.baseURL}/delete/${id}`);
  }
}
