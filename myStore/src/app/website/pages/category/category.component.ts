import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {


  categoryId: string | null = null;
  limit = 10;
  offset = 0;
  products: Product[];

  constructor(private route: ActivatedRoute, private serviceProduct: ProductsService) {

  }

  ngOnInit(): void {
    //OBTENEMOS EL PARAMETRO QUE VIENE EN NUESTRA RUTA
      this.route.paramMap.subscribe( params => {
        this.categoryId = params.get('id')
        this.serviceProduct.getProductsByCategory(this.categoryId, this.limit, this.offset)
        .subscribe( data => {
          this.products = data;
          console.log(data);
        })
      })
  }

}
