import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { FormMatiere } from '../form-matiere.model';

@Injectable({
  providedIn: 'root'
})
export class FormMatiereService {
  subjectNotifier: Subject<null> = new Subject<null>();
  private baseURL = "http://localhost:4900/formmatiere"
  constructor(private httpClient : HttpClient) { }

  list():Observable<FormMatiere[]>{
    return this.httpClient.get<FormMatiere[]>(`${this.baseURL}`);
  }

  add(formMatiere : FormMatiere) : Observable<Object> {
    return this.httpClient.post(`${this.baseURL}` , formMatiere);
  }

  get(id:number):Observable<FormMatiere>{
    return this.httpClient.get<FormMatiere>(`${this.baseURL}/${id}`)
  }

  getbyFandM(idf?:number ,idm?:number):Observable<FormMatiere>{
    return this.httpClient.get<FormMatiere>(`${this.baseURL}/find/${idf}/${idm}`)
  }
  update(id:number , formMatiere: FormMatiere): Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/${id}`,formMatiere)
  }
  delete(id?: number): Observable<Object> {
    return this.httpClient.get(`${this.baseURL}/delete/${id}`);
  }
  notifyAboutChange() {
    this.subjectNotifier.next(null);
  }
}
