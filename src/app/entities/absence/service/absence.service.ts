import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Absence } from '../absence.model';

@Injectable({
  providedIn: 'root'
})
export class AbsenceService {

  private baseURL = "http://localhost:2125/absence"
  constructor(private httpClient : HttpClient) { }

  list():Observable<Absence[]>{
    return this.httpClient.get<Absence[]>(`${this.baseURL}`);
  }

  add(absence : Absence) : Observable<Object> {
    return this.httpClient.post(`${this.baseURL}` , absence);
  }

  get(id:number):Observable<Absence>{
    return this.httpClient.get<Absence>(`${this.baseURL}/${id}`)
  }
  update(id:number , absence: Absence): Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/${id}`,absence)
  }
  delete(id: number): Observable<Object> {
    return this.httpClient.get(`${this.baseURL}/delete/${id}`);
  }
}
