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

    <section id="about">
      @defer (on viewport) {
        <app-about></app-about>
      } @placeholder {
        <div class="section-placeholder">Loading About...</div>
      }
    </section>

    <section id="projects">
      @defer (on viewport) {
        <app-projects></app-projects>
      } @placeholder {
        <div class="section-placeholder">Loading Projects...</div>
      }
    </section>

    <section id="contact">
      @defer (on viewport) {
        <app-contact></app-contact>
      } @placeholder {
        <div class="section-placeholder">Loading Contact...</div>
      }
    </section>
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
