import { HTTP_INTERCEPTORS, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';


import { Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';

const TOKEN_HEADER_KEY = 'Authorization';       // for Spring Boot back-end
// const TOKEN_HEADER_KEY = 'x-access-token';   // for Node.js Express back-end

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private token: TokenStorageService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = req;
    const token = localStorage.getItem('token');
    if (token !== null) {
      
      // for Spring Boot back-end
      authReq = req.clone({ headers: req.headers
        .set('Content-Type', 'application/json')
        .set('Authorization', 'Bearer '+token)
        .set('Access-Control-Allow-Origin' , 'http://localhost:4200')
        
        .set('Access-Control-Allow-Methods', 'GET')
        .set('Access-Control-Allow-Headers', 'Content-Type,Access-Control-Allow-Origin,Authorization,') });
      console.log(authReq)

      // for Node.js Express back-end
      // authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, token) });
    }
    return next.handle(authReq);
  }
}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];