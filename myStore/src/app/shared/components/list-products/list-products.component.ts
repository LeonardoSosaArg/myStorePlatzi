import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { switchMap, zip } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductCreateDto } from 'src/app/models/productCreateDto';
import { ProductUpdateDto } from 'src/app/models/productUpdateDto';
import { FileService } from 'src/app/services/file.service';
import { ProductsService } from 'src/app/services/products.service';
import { StoreService } from 'src/app/services/store.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss'],
})
export class ListProductsComponent{

  @Input() products : Product[] = [];
  //@Input() productId: any | null = null;
  @Input() set productId(id: any) {
    if (id) {
      this.onShowDetail(id);
    }
  }
  @Output() loadMore = new EventEmitter();
 
  myShoppingCart: Product[] = [];
  total = 0;
  today = new Date();
  fechaUltimaCompra: Date = new Date('03/12/2023');
  showProductDetail = false;
  productSeleccionado: Product = {
    id: 0,
    title: '',
    price: 0,
    description: '',
    category: { id: 0, name: '', typeImg: '' },
    images: [],
  };

  limit = 10;
  offset = 0;
  //PARA EL MANEJO DE ERROR AL OBTENER EL DETALLE DE UN PRODUCTO
  statusDetail: 'loading' | 'success' | 'error' | 'init' = 'init';
  imagenRespuesta = ''

  constructor(
    private productService: ProductsService,
    private storeService: StoreService,
    private fileService: FileService
  ) {}



  onAddToShoppingCart(product: Product) {
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }

  toggleProductDetail() {
    this.showProductDetail = !this.showProductDetail;
  }

  onShowDetail(id: string) {
    this.statusDetail = 'loading';
    if (!this.showProductDetail) {
      this.showProductDetail = true;
    }
    this.productService.getProduct(id).subscribe({
      next: (data) => {
        this.productSeleccionado = data;
        this.statusDetail = 'success';
      },
      error: (errorMsg) => {
        Swal.fire({
          title: 'Error!',
          text: errorMsg,
          icon: 'error',
          confirmButtonText: 'Accept',
        });
        this.statusDetail = 'error';
      },
    });
  }

  readAndUpdate(id: any) {
    this.productService.getProduct(id)
    .pipe(//CUANDO NECESITAS EJECUTAR UN OBSERVABLE DESPUES DE OTRO
      switchMap((product) => {
        return this.productService.updateProudct(product.id, {title: 'title change my friend'})
      })
    )
    this.productService.readAndUpdate(id, {title: 'ttile changed'})
    .subscribe( response => {
      const read = response[0];
      const update = response[1];
    }); 

  }

  createNewProduct() {
    const product: ProductCreateDto = {
      title: 'new Product',
      description: 'descripcion descripcion descripcion',
      images: [`https://placeimg.com/640/480/any?random=${Math.random()}`],
      price: 1000,
      categoryId: 1,
    };
    this.productService.createProduct(product).subscribe((data) => {
      //INSERTAMOS NUESTRO PRODUCTO EN LA 1ERA POSICION DEL ARRAY
      this.products.unshift(data);
    });
  }

  updateProduct() {
    const changes: ProductUpdateDto = {
      title: 'Nuevo title',
      description: 'Esta es un prueba',
    };
    const id = this.productSeleccionado.id;
    this.productService.updateProudct(id, changes).subscribe((data) => {
      const productIndex = this.products.findIndex(
        (item) => item.id == this.productSeleccionado.id
      );
      this.products[productIndex] = data;
      this.productSeleccionado = data;
    });
  }

  deleteProduct() {
    const id = this.productSeleccionado.id;
    this.productService.deleteProduct(id).subscribe((data) => {
      const productIndex = this.products.findIndex(
        (item) => item.id == this.productSeleccionado.id
      );
      this.products.splice(productIndex, 1);
      this.showProductDetail = false;
    });
  }


  onLoadMore(){
    this.loadMore.emit();
  }
  

  download(){
    this.fileService.getFile("myPdf","https://young-sands-07814.herokuapp.com/api/files/dummy.pdf","application/pdf")
    .subscribe()
  }

  onUpload(event : Event){
    const element = event.target as HTMLInputElement;
    const file = element.files?.item(0);
    if (file) {
      this.fileService.uploadFile(file)
      .subscribe( rta => {
        this.imagenRespuesta = rta.location;
      })
    }
  }

}
