import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Formation } from '../formation.model';

@Injectable({
  providedIn: 'root'
})
export class FormationService {
  subjectNotifier: Subject<null> = new Subject<null>();
  private baseURL = "http://localhost:4900/formation"
  constructor(private httpClient : HttpClient) { }
  

  list():Observable<Formation[]>{
    return this.httpClient.get<Formation[]>(`${this.baseURL}`);
  }
  notinlist(id:number):Observable<Formation[]>{
    return this.httpClient.get<Formation[]>(`${this.baseURL}/nform/${id}`);
  }
  add(formation : Formation) : Observable<Object> {
    return this.httpClient.post(`${this.baseURL}` , formation);
  }

  get(id?:number):Observable<Formation>{
    return this.httpClient.get<Formation>(`${this.baseURL}/${id}`)
  }
  update(id:number , formation: Formation): Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/${id}`,formation)
  }
  delete(id: number): Observable<Object> {
    return this.httpClient.get(`${this.baseURL}/delete/${id}`);
  }
  notifyAboutChange() {
    this.subjectNotifier.next(null);
  }
}
