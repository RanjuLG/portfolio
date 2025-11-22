import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { AboutComponent } from './pages/about/about';
import { ProjectsComponent } from './pages/projects/projects';
import { ProjectDetailComponent } from './pages/project-detail/project-detail';
import { ContactComponent } from './pages/contact/contact';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Ranju Gamage - Full-Stack Developer'
  },
  {
    path: 'about',
    component: AboutComponent,
    title: 'About - Ranju Gamage'
  },
  {
    path: 'projects',
    component: ProjectsComponent,
    title: 'Projects - Ranju Gamage'
  },
  {
    path: 'projects/:id',
    component: ProjectDetailComponent,
    title: 'Project Details - Ranju Gamage'
  },
  {
    path: 'contact',
    component: ContactComponent,
    title: 'Contact - Ranju Gamage'
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

