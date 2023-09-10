import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './components/product/product.component';
import { ListProductsComponent } from './components/list-products/list-products.component';
import { TimeAgoPipe } from './pipes/time-ago.pipe';
import { ImgComponent } from './components/img/img.component';
import { ReversePipe } from './pipes/reverse.pipe';
import { RestaltadorDirective } from './directives/restaltador.directive';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { RouterModule } from '@angular/router';
import { SwiperModule } from 'swiper/angular';



//EN EL MODULO SHARED DECLARAMOS LOS COMPONENTES QUE USAREMOS EN OTROS MODULOS
@NgModule({
  declarations: [
    NavBarComponent,
    ProductComponent,
    ListProductsComponent,
    TimeAgoPipe,
    ImgComponent,
    ReversePipe,
    RestaltadorDirective,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SwiperModule
  ],
  exports: [
    NavBarComponent,
    ProductComponent,
    ListProductsComponent,
    TimeAgoPipe,
    ImgComponent,
    ReversePipe,
    RestaltadorDirective,
  ]
})
export class SharedModule { }
