import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
//SERVICIO PARA HABILITAR LA CARGA DE MODULES ESPECIFICOS
export class CustomPreloadService implements PreloadingStrategy{

  constructor() { }

   preload(route: Route, load: () => Observable<any>): Observable<any> {
    //LAS RUTAS QUE TENGAN PRELOAD SE VAN A PRECARGAR
    if (route.data && route.data['preload']) {
      return load();
    }
    //RETORNA UN OBSERVABLE VACIO
    else return of(null);
  }
}
