import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Revue } from '../revue.model';

@Injectable({
  providedIn: 'root'
})
export class RevueService {
  subjectNotifier: Subject<null> = new Subject<null>();
  private baseURL = "http://localhost:4900/revue"
  constructor(private httpClient : HttpClient) { }

  list():Observable<Revue[]>{
    return this.httpClient.get<Revue[]>(`${this.baseURL}`);
  }

  listbyM(id?:number):Observable<Revue[]>{
    return this.httpClient.get<Revue[]>(`${this.baseURL}/matiere/${id}`);
  }

  add(revue : Revue) : Observable<Object> {
    return this.httpClient.post(`${this.baseURL}` , revue);
  }

  get(id:number):Observable<Revue>{
    return this.httpClient.get<Revue>(`${this.baseURL}/${id}`)
  }
  update(id:number , revue: Revue): Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/${id}`,revue)
  }
  delete(id: number): Observable<Object> {
    return this.httpClient.get(`${this.baseURL}/delete/${id}`);
  }
  notifyAboutChange() {
    this.subjectNotifier.next(null);
  }
}
