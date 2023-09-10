import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebsiteRoutingModule } from './website-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { MyCartComponent } from './pages/my-cart/my-cart.component';
import { RegisterComponent } from './pages/register/register.component';
import { RecoveryComponent } from './pages/recovery/recovery.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { LoginComponent } from './components/login/login.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { LayoutComponent } from './components/layout/layout.component';
import { SwiperModule } from 'swiper/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { QuicklinkModule } from 'ngx-quicklink';

@NgModule({
  declarations: [
    LoginComponent,
    CreateUserComponent,
    HomeComponent,
    MyCartComponent,
    RegisterComponent,
    RecoveryComponent,
    ProfileComponent,
    ProductDetailComponent,
    LayoutComponent,
  ],
  imports: [CommonModule,
    WebsiteRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    SwiperModule,
    //importamos el QuickLinkModulo para habilitar la precarga de modulos segun usuario
    QuicklinkModule
  ],
})
export class WebsiteModule {}
