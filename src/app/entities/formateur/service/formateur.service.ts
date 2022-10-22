import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Formateur } from '../formateur.model';

@Injectable({
  providedIn: 'root'
})
export class FormateurService {

  private baseURL = "http://localhost:4900/formateur"
  constructor(private httpClient : HttpClient) { }

  list():Observable<Formateur[]>{
    return this.httpClient.get<Formateur[]>(`${this.baseURL}`);
  }

  add(formateur : Formateur) : Observable<Object> {
    return this.httpClient.post(`${this.baseURL}` , formateur);
  }

  get(id:number):Observable<Formateur>{
    return this.httpClient.get<Formateur>(`${this.baseURL}/${id}`)
  }
  update(id:number , formateur: Formateur): Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/${id}`,formateur)
  }
  delete(id: number): Observable<Object> {
    return this.httpClient.get(`${this.baseURL}/delete/${id}`);
  }
}
