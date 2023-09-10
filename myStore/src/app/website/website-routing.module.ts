import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { HomeComponent } from './pages/home/home.component';
import { MyCartComponent } from './pages/my-cart/my-cart.component';
import { RegisterComponent } from './pages/register/register.component';
import { RecoveryComponent } from './pages/recovery/recovery.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { LayoutComponent } from './components/layout/layout.component';
import { ListProductsComponent } from '../shared/components/list-products/list-products.component';
import { AuthGuard } from '../guards/auth.guard';
import { ExitGuard } from '../guards/exit.guard';

const routes: Routes = [
  {
    path: '',//EL COMPONENT LAYOUT ES EL QUE CONTIENE AL NAV-BAR
    component: LayoutComponent,
    children: [//VISTAS ANIDADAS
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      { path: 'home', component: HomeComponent },
      { path: 'category',
      loadChildren: () => import('././pages/category/category.module').then(c => c.CategoryModule),
      data: {
        preload: true,
      }, },
      { path: 'myCart', component: MyCartComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'recovery', component: RecoveryComponent },
      { path: 'profile', canActivate: [AuthGuard], component: ProfileComponent},
      { path: 'login', component: LoginComponent },
      { path: 'list-products', component: ListProductsComponent },
      { path: 'create-user',
      canDeactivate: [ExitGuard],//GUARD PARA NO PERMITIR SALIR DE LA RUTA
      component: CreateUserComponent },
      { path: 'product/:id', component: ProductDetailComponent }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebsiteRoutingModule { }
