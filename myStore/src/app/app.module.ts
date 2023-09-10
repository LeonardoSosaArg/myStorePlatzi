import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SwiperModule } from 'swiper/angular';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
//PARA CARCA DE MODULOS ESPECIFICOS SEGUN EL TIPO DE USUARIO
import { QuicklinkModule } from 'ngx-quicklink';


@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    SwiperModule,
    SweetAlert2Module,
    QuicklinkModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
