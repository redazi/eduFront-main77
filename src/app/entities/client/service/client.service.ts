import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Client } from '../client.model';
const httpOptions = {
  headers: new HttpHeaders({
   
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
  }),
  responseType: 'text' as 'json'
};
@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private baseURL = "http://localhost:4900/client"
  private baseURL1 = "http://localhost:4900/client/count"
  constructor(private httpClient : HttpClient) { }

  list():Observable<Client[]>{
    return this.httpClient.get<Client[]>(`${this.baseURL}`   );
  }
  countClient():Observable<any>{
    
    return this.httpClient.get(`${this.baseURL1}`);
  }
  add(client : Client) : Observable<Object> {
    return this.httpClient.post(`${this.baseURL}` , client);
  }

  get(id:number):Observable<Client>{
    return this.httpClient.get<Client>(`${this.baseURL}/${id}`)
  }
  update(id:number , client: Client): Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/${id}`,client)
  }
  delete(id: number): Observable<Object> {
    return this.httpClient.get(`${this.baseURL}/delete/${id}`);
  }
}
