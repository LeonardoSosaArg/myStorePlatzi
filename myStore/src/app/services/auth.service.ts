import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { enviroment } from 'src/enviroments/enviroment';
import { User } from '../models/user';
import { BehaviorSubject, switchMap, tap } from 'rxjs';
import { TokenService } from './token.service';
import { addTokenHeader } from '../interceptors/token.interceptor';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private urlBase = `${enviroment.API_URL}auth`;
  //OBSERVABLE PARA CONSULTAR CONTINUAMENTE EL ESTADO DEL USUARIO SI ESTA LOGUEADO
  private user = new BehaviorSubject<User | null>(null); //ESTADO INICIAL NULL
  //ESCUCHAR ACTIVAMENTE CAMBIO CON EL OBSERVABLE
  user$ = this.user.asObservable();

  constructor(private http: HttpClient, private tokenService: TokenService, private router: Router) { }

  login(email: string, password: string){
    return this.http.post<any>(`${this.urlBase}/login`,{email,password})
    .pipe(
      tap(response => this.tokenService.saveToken(response.access_token))
    );
  }

  logout(){
    this.tokenService.removeToken();
    this.router.navigate(['/home']);
  }

  getProfile(){
    return this.http.get<User>(`${this.urlBase}/profile` , {context : addTokenHeader()}).pipe(
      //SETEAMOS EL USER AL OBSERVABLE, UNA VEZ QUE INICIAMOS SESIÓN
      tap(user => this.user.next(user))
    );
  }

  loginAndGet(email : string, password : string){
    return this.login(email,password)
    .pipe(
      switchMap( () => this.getProfile())
    )
  }

}
