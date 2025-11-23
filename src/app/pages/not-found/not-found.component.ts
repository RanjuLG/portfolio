import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink, CommonModule],
  template: `
    <div class="not-found-container">
      <div class="content">
        <h1 class="error-code">404</h1>
        <h2 class="error-message">Page Not Found</h2>
        <p class="error-description">Oops! The page you're looking for doesn't exist or has been moved.</p>
        <a routerLink="/" class="btn btn-primary">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" fill="currentColor"/>
          </svg>
          Go Home
        </a>
      </div>
    </div>
  `,
  styles: [`
    .not-found-container {
      min-height: 80vh;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 2rem;
    }
    .content {
      max-width: 600px;
    }
    .error-code {
      font-size: 8rem;
      font-weight: 800;
      line-height: 1;
      margin-bottom: 1rem;
      background: var(--gradient-primary);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    .error-message {
      font-size: 2.5rem;
      margin-bottom: 1rem;
      color: var(--text-primary);
    }
    .error-description {
      font-size: 1.25rem;
      color: var(--text-secondary);
      margin-bottom: 2rem;
    }
  `]
})
export class NotFoundComponent {
  constructor(private seoService: SeoService) {
    this.seoService.updateMetaTags({
      title: 'Page Not Found',
      description: 'The page you are looking for does not exist.',
      slug: '404'
    });
  }
}
