import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { CustomPreloadService } from './services/custom-preload.service';
//PARA CARCA DE MODULOS ESPECIFICOS SEGUN EL TIPO DE USUARIO
import { QuicklinkStrategy } from 'ngx-quicklink';
import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [
  {
    path: '', //IMPORTAMOS MODULO WEBSITE
    loadChildren: () =>
      import('./website/website.module').then((m) => m.WebsiteModule),
    //ESPECIFICAMOS LA DATA Y EL PRELOAD, PARA QUE EL SERVICE HAGA EL PREOLOAD DE ESTE MODULO
    data: {
      preload: true,
    },
  },
  {
    path: 'cms', //IMPORTAMOS MODULO ADMIN
    canActivate: [AdminGuard],
    loadChildren: () => import('./cms/cms.module').then((m) => m.CmsModule),
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      //HABILITA LA PRECARGA DE TODOS LOS MODULOS, DESPUES DE HACER LA CARGA DEL MODULO INICIAL
      //preloadingStrategy: PreloadAllModules,
      //SERVICIO QUE HABILITA LA PRECARGA DE MODULOS ESPECIFICOS
      //preloadingStrategy: CustomPreloadService
      //SERVICIO QUE HABILITA LA PRECARGA DE MODULOS ESPECIFICOS SEGUN EL TIPO DE USUARIO
      preloadingStrategy: QuicklinkStrategy
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
