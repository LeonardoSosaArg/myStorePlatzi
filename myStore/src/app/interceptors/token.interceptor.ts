import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpContext,
  HttpContextToken,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token.service';

//CREAMOS UN CONTEXTO PARA EL INTERCEPTOR
const AUTH_TOKEN = new HttpContextToken<boolean>(() => false);

//solo va a agregar el Token al header, en las peticiones en las cuales tengan un contexto
export function addTokenHeader() {
  return new HttpContext().set(AUTH_TOKEN, true);
}

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private tokenService: TokenService) {}

  //INTERCEPTOR QUE AÑADE EL TOKEN EN LOS HEADERS A MIS PETICIONES
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    request = this.addToken(request);
    return next.handle(request);
  }

  //METODO PARA AÑADIR EL TOKEN A MIS PETICIONES
  private addToken(request: HttpRequest<unknown>) {
    if (request.context.get(AUTH_TOKEN)) {
      const token = this.tokenService.getToken();
      console.log('entro addToken inteceptor');
      if (token) {
        const authRequest = request.clone({
          headers: request.headers.set('Authorization', `Bearer ${token}`),
        });
        return authRequest;
      }
    }

    return request;
  }
}
