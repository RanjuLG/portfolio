import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { PROFILE_CONFIG } from '../config/profile.config';

export interface SeoConfig {
  title: string;
  description: string;
  image?: string;
  slug?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private readonly defaultImage = 'assets/images/og-image.jpg'; // Placeholder
  private readonly siteName = PROFILE_CONFIG.seo.siteName;
  private readonly baseUrl = PROFILE_CONFIG.urls.baseUrl;

  constructor(private title: Title, private meta: Meta) { }

  updateMetaTags(config: SeoConfig): void {
    // Update Title
    const pageTitle = `${config.title} | ${this.siteName}`;
    this.title.setTitle(pageTitle);

    // Update Meta Tags
    this.meta.updateTag({ name: 'description', content: config.description });

    // Open Graph
    this.meta.updateTag({ property: 'og:title', content: pageTitle });
    this.meta.updateTag({ property: 'og:description', content: config.description });
    this.meta.updateTag({ property: 'og:image', content: config.image || this.defaultImage });
    this.meta.updateTag({ property: 'og:url', content: `${this.baseUrl}/${config.slug || ''}` });
    this.meta.updateTag({ property: 'og:type', content: 'website' });

    // Twitter Card
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: pageTitle });
    this.meta.updateTag({ name: 'twitter:description', content: config.description });
    this.meta.updateTag({ name: 'twitter:image', content: config.image || this.defaultImage });
  }
}
