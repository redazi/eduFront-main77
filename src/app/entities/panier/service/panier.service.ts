import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Client } from '../../client/client.model';
import { Panier } from '../panier.model';

@Injectable({
  providedIn: 'root'
})
export class PanierService {
  subjectNotifier: Subject<null> = new Subject<null>();

  private baseURL = "http://localhost:4900/panier"
  constructor(private httpClient : HttpClient) { }

  list():Observable<Panier[]>{
    return this.httpClient.get<Panier[]>(`${this.baseURL}`);
  }
  checkIfDejaExistist(id:number):Observable<Panier[]>{
    return this.httpClient.get<Panier[]>(`${this.baseURL}/checkIfDejaExist/${id}`);
  }
  getuser():Observable<Client>{
    return this.httpClient.get<Client>(`${this.baseURL}/getuser`);
  }

  notifyAboutChange() {
    this.subjectNotifier.next(null);
  }
  add(panier : Panier) : Observable<Object> {
    return this.httpClient.post(`${this.baseURL}` , panier);
  }
  
  get(id:number):Observable<Panier>{
    return this.httpClient.get<Panier>(`${this.baseURL}/${id}`)
  }
  getplanification():Observable<Panier[]>{
    return this.httpClient.get<Panier[]>(`${this.baseURL}/getplanification`)
  }
  update(id:number , panier: Panier): Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/${id}`,panier)
  }
  delete(id: number): Observable<Object> {
    return this.httpClient.get(`${this.baseURL}/delete/${id}`);
  }
}
