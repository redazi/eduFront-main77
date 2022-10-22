import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, config, map, mapTo, Observable, of, tap } from 'rxjs';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { Login } from './login.model';
import { Tokens } from './token.model';
import { Router } from '@angular/router';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
type JwtToken = {
  id_token: string;
};
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private baseURL = "http://localhost:4900"
  
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
  private loggedUser: string | null | undefined;

  constructor(private http: HttpClient, private  router : Router) {}


  login(credentials : Login): Observable<any> {
    return this.http.post(`${this.baseURL}/authenticate` , credentials, httpOptions);
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['home']);

  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseURL}/logout`+ 'signup', {
      username,
      email,
      password
    }, httpOptions);
  }
}
