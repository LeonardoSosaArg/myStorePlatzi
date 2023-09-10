import { HttpClient, HttpErrorResponse, HttpParams, HttpResponse, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product';
//importamos enviroments
import { enviroment } from './../../enviroments/enviroment';
import { catchError, throwError, map, zip } from 'rxjs';
import { ProductCreateDto } from '../models/productCreateDto';
import { ProductUpdateDto } from '../models/productUpdateDto';
@Injectable({
  providedIn: 'root',
})
export class ProductsService {

  private urlBase = enviroment.API_URL;

  //CUANDO VAMOS A DESPLEGAR EN PRODUCCIÓN
  //LOS CORS DEBEN SER HABILITADOS DESDE EL BACKEND

  constructor(private http: HttpClient) {}

  getAllProducts() {
    return this.http.get<Product[]>(
      this.urlBase + 'products?limit=12&offset=12'
    ).pipe(//TRANSFORMAR LA DATA QUE NOS LLEGA DESDE EL BACK
      map(products => products.map(item => {
        return {//A CADA UNO DE LOS ELEMENTOS LE AGREGAMOS UN ATRIBUTO MAS DE IMPUESTOS
          ...item,
          impuestos: 0.21 * item.price
        }
      }))
    );
  }

  getProductsByCategory(id: any, limit?: number, offset?: number){
    let params = new HttpParams();
    if (limit && offset != null) {
      params = params.set('limit',limit);
      params = params.set('offset', offset)
    }
    return this.http.get<Product[]>(`${this.urlBase}categories/${id}/products`, {
      params
    });
  }

  readAndUpdate(id: any, dto: ProductUpdateDto){
    //EJECUTAMOS LOS DOS OBSERVABLES Y OBTENEMOS SUS RESPUESTAS AL MISMO TIEMPO
    return zip(//CUANDO NECESITAS EJECUTAR LOS DOS OBSERVABLES AL MISMO TIEMPO
      this.getProduct(id),
      this.updateProudct(id, dto)
    );
  }

  getProduct(id: string) {
    return this.http.get<Product>(this.urlBase + 'products/' + id)
    .pipe( 
      catchError((error: HttpErrorResponse) => {
        if (error.status == HttpStatusCode.InternalServerError) {
          return throwError(() => new Error('Algo fallò en el servidor'));
        }
        if (error.status == 404) { //NOT FOUND
          // return throwError('El producto no existe.');
          return throwError(() => new Error('El producto no existe.'));
        }
        if (error.status == HttpStatusCode.Unauthorized) {
          return throwError(() => new Error('Usuario no autorizado para ejecutar la petición.'));
        }
        return throwError(() => new Error('Ups algó salio mal.'));
      })
    )
  }

  getProductsByPage(limit: number, offset: number) {
    return this.http.get<Product[]>(`${this.urlBase}products/`, {
      params: { limit, offset },
    });
  }

  createProduct(productDto: ProductCreateDto) {
    return this.http.post<Product>(this.urlBase + 'products', productDto);
  }

  //LA DIFERENCIA ENTRE PUT Y PATCH
  //PUT ENVIA TODO EL OBJETO, AUN SI MODIFICAMOS UN SOLO CAMPO
  //PATCH ENVIA SOLO EL CAMPO QUE MODIFICADMOS
  updateProudct(id: number, updateDto: ProductUpdateDto) {
    return this.http.put<Product>(`${this.urlBase}products/${id}`, updateDto);
  }

  deleteProduct(id: number) {
    return this.http.delete<boolean>(`${this.urlBase}products/${id}`);
  }
}
