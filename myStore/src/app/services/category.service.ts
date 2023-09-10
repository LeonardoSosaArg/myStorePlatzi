import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from 'src/enviroments/enviroment';
import { Category } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private urlBase = enviroment.API_URL;

  constructor(private http: HttpClient) { }

  getAll(limit?: number, offset?: number){
    let params = new HttpParams();
    if (limit && offset) {
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }
    return this.http.get<Category[]>(`${this.urlBase}categories`, {params});
  }


}
