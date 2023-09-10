import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private myShoppingCart: Product[] = [];
  private myCart = new BehaviorSubject<Product[]>([]); //ESTADO INCIAL VACIO
  
  //ESCUCHAR ACTIVAMENTE CAMBIO CON EL OBSERVABLE
  myCart$ = this.myCart.asObservable(); 
  

  getShoppingCart(){
    return this.myShoppingCart;
  }

  addProduct(product: Product){
    this.myShoppingCart.push(product);
    this.myCart.next(this.myShoppingCart);
  }

  getTotal() : number{
    return this.myShoppingCart.reduce((sum, item) => sum + item.price, 0);
  }

}
