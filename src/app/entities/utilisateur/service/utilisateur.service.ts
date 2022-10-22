import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Utilisateur } from '../utilisateur.model';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  private baseURL = "http://localhost:4900/utilisateur"
 
  constructor(private httpClient : HttpClient) { }

  list():Observable<Utilisateur[]>{
    return this.httpClient.get<Utilisateur[]>(`${this.baseURL}`   );
  }
  
  add(utilisateur : Utilisateur) : Observable<Object> {
    return this.httpClient.post(`${this.baseURL}` , utilisateur);
  }

  get(id:number):Observable<Utilisateur>{
    return this.httpClient.get<Utilisateur>(`${this.baseURL}/${id}`)
  }
  update(id:number , utilisateur: Utilisateur): Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/${id}`,utilisateur)
  }
  delete(id: number): Observable<Object> {
    return this.httpClient.get(`${this.baseURL}/delete/${id}`);
  }
}
