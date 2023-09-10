import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductsService } from 'src/app/services/products.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
 
  productId: any | null = null;
  product: Product | null = null;

  constructor(private productService: ProductsService,
    private route: ActivatedRoute, private location: Location) {
       
  }
 
  ngOnInit(): void {
    this.getDetail();
  }

  getDetail(){
    //OBTENEMOS EL PARAMETRO QUE VIENE EN NUESTRA RUTA
    this.route.paramMap.subscribe( params => {
      this.productId = params.get('id')
      this.productService.getProduct(this.productId)
      .subscribe( data => {
        this.product = data;
        console.log(data);
      })
    })
  }

  goToBack(){
    this.location.back();
  }

}
