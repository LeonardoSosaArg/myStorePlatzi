import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductsService } from 'src/app/services/products.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  limit = 10;
  offset = 0;
  myShoppingCart: Product[] = [];
  products : Product[] = [];
  productId: any | null = null;

  constructor(private productService: ProductsService, private storeService: StoreService,
    private route: ActivatedRoute) {
    
  }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe((data) => {
      this.products = data;
      this.offset += this.limit;
    });
    this.myShoppingCart = this.storeService.getShoppingCart();
    this.route.queryParamMap.subscribe( params => {
      this.productId = params.get('product');
    })
  }

  loadMore() {
    this.productService
      .getProductsByPage(this.limit, this.offset)
      .subscribe((data) => {
        //PARA CONCATENAR EL ARRAY QUE NOS LLEGA AL QUE YA TENEMOS
        this.products = this.products.concat(data);
        //OFFSET ES EL NUMERO DE OBJETOS QUE QUEREMOS EXCLUIR DE NUESTRA PETICION
        //EN ESTE CASO, AL RANDERIZAR LOS PRIMEROS 10 PRODUCTOS LA PRIMERA VEZ,
        //CUANDO HAGAMOS CLICK EN LOAD MORE, OMIITARA ESOS 10 PROD YA CARGADOS ANTERIORMENTE(LIMIT)
        //INICIA DESDE EL ELEMENTO 10 EN ADELANTE
        this.offset += this.limit;
      });
  }

}
