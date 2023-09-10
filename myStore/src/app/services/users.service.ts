import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { enviroment } from 'src/enviroments/enviroment';
import { CreateUserDto, User } from '../models/user';
import { TokenService } from './token.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private urlBase = `${enviroment.API_URL}users`;

  constructor(private http: HttpClient, private tokenService: TokenService
    , private router: Router) { }

  create(dto: CreateUserDto){
    return this.http.post<User>(this.urlBase, dto);
  }

  getAll(){
    return this.http.get<User[]>(this.urlBase);
  }



}
