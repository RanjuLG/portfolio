import { Component } from '@angular/core';
import { HomeComponent } from '../home/home';
import { AboutComponent } from '../about/about';
import { ProjectsComponent } from '../projects/projects';
import { ContactComponent } from '../contact/contact';

@Component({
  selector: 'app-main-layout',
  imports: [HomeComponent, AboutComponent, ProjectsComponent, ContactComponent],
  template: `
    <section id="home">
      <app-home></app-home>
    </section>

    @defer (on viewport) {
      <section id="about">
        <app-about></app-about>
      </section>
    } @placeholder {
      <div class="section-placeholder">Loading About...</div>
    }

    @defer (on viewport) {
      <section id="projects">
        <app-projects></app-projects>
      </section>
    } @placeholder {
      <div class="section-placeholder">Loading Projects...</div>
    }

    @defer (on viewport) {
      <section id="contact">
        <app-contact></app-contact>
      </section>
    } @placeholder {
      <div class="section-placeholder">Loading Contact...</div>
    }
  `,
  styles: [`
    .section-placeholder {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--text-secondary);
      font-size: 1.2rem;
    }
  `]
})
export class MainLayoutComponent {}
