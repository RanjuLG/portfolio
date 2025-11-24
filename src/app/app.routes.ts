import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/main-layout/main-layout.component').then(m => m.MainLayoutComponent)
  },
  {
    path: 'about',
    redirectTo: '/#about',
    pathMatch: 'full'
  },
  {
    path: 'projects/:id',
    loadComponent: () => import('./pages/project-detail/project-detail').then(m => m.ProjectDetailComponent)
  },
  {
    path: 'projects',
    redirectTo: '/#projects',
    pathMatch: 'full'
  },
  {
    path: 'contact',
    redirectTo: '/#contact',
    pathMatch: 'full'
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent)
  }
];

