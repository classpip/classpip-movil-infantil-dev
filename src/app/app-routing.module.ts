import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'canvas',
    loadChildren: () => import('./pages/cuentocanvas/cuentocanvas.module').then( m => m.CuentocanvasPageModule)
  },

  {
    path: 'cuentocanvas/:id',
    loadChildren: () => import('./pages/cuentocanvas/cuentocanvas.module').then( m => m.CuentocanvasPageModule)
  },
  {
    path: 'seleccionpersonaje/:dataObj',
    loadChildren: () => import('./pages/cuentocanvas/cuentocanvas.module').then( m => m.CuentocanvasPageModule)
  },
  {
    path: 'cuentofondos/:dataObj',
    loadChildren: () => import('./pages/cuentocanvas/cuentocanvas.module').then( m => m.CuentocanvasPageModule)
  },
  {
    path: 'cuentofondos',
    loadChildren: () => import('./pages/cuentofondos/cuentofondos.module').then( m => m.CuentofondosPageModule)
  },
  {
    path: 'seleccionpersonaje',
    loadChildren: () => import('./pages/seleccionpersonaje/seleccionpersonaje.module').then( m => m.SeleccionpersonajePageModule)
  },
  {
    path: 'libro',
    loadChildren: () => import('./pages/libro/libro.module').then( m => m.LibroPageModule)
  },
  {
    path: 'inicio',
    loadChildren: () => import('./pages/inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'iniciolibro',
    loadChildren: () => import('./pages/iniciolibro/iniciolibro.module').then( m => m.IniciolibroPageModule)
  },
  {
    path: 'listaescenas/:id',
    loadChildren: () => import('./pages/listaescenas/listaescenas.module').then( m => m.ListaescenasPageModule)
  },
  {
    path: 'reproductor/:id',
    loadChildren: () => import('./pages/reproductor/reproductor.module').then( m => m.ReproductorPageModule)
  }, 
  {
    path: 'reproductor',
    loadChildren: () => import('./pages/reproductor/reproductor.module').then( m => m.ReproductorPageModule)
  },
  {
    path: 'media',
    loadChildren: () => import('./pages/media/media.module').then( m => m.MediaPageModule)
  },

  {
    path: 'juegos',
    loadChildren: () => import('./pages/juegos/juegos.module').then( m => m.JuegosPageModule)
  },
  {
    path: 'todoslibros',
    loadChildren: () => import('./pages/todoslibros/todoslibros.module').then( m => m.TodoslibrosPageModule)
  },
  {
    path: 'grupo',
    loadChildren: () => import('./pages/grupo/grupo.module').then( m => m.GrupoPageModule)
  },
  {
    path: 'juegolibro',
    loadChildren: () => import('./pages/juegolibro/juegolibro.module').then( m => m.JuegolibroPageModule)
  },
  {
    path: 'votacionesconcurso',
    loadChildren: () => import('./pages/votacionesconcurso/votacionesconcurso.module').then( m => m.VotacionesconcursoPageModule)
  },
  {
    path: 'resultadosconcurso',
    loadChildren: () => import('./pages/resultadosconcurso/resultadosconcurso.module').then( m => m.ResultadosconcursoPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },

  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'seleccionobjeto',
    loadChildren: () => import('./pages/seleccion-objeto/seleccion-objeto.module').then( m => m.SeleccionObjetoPageModule)
  }








  

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
