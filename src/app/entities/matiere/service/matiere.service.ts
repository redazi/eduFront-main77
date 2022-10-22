import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Matiere } from '../matiere.model';

@Injectable({
  providedIn: 'root'
})
export class MatiereService {

  private baseURL = "http://localhost:4900/matiere"
  constructor(private httpClient : HttpClient) { }

  list():Observable<Matiere[]>{
    return this.httpClient.get<Matiere[]>(`${this.baseURL}`);
  }

  listForFormation(id:number):Observable<Matiere[]>{
    return this.httpClient.get<Matiere[]>(`${this.baseURL}/form/${id}`);
  }

  notinlist(id:number):Observable<Matiere[]>{
    return this.httpClient.get<Matiere[]>(`${this.baseURL}/nform/${id}`);
  }

  add(matiere : Matiere) : Observable<Object> {
    return this.httpClient.post(`${this.baseURL}` , matiere);
  }

  get(id:number):Observable<Matiere>{
    return this.httpClient.get<Matiere>(`${this.baseURL}/${id}`)
  }
  update(id:number , matiere: Matiere): Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/${id}`,matiere)
  }
  delete(id: number): Observable<Object> {
    return this.httpClient.get(`${this.baseURL}/delete/${id}`);
  }
}
