import { Component, signal, HostListener, OnInit, Inject, PLATFORM_ID, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink, ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { filter } from 'rxjs/operators';
import { ThemeService } from '../../services/theme.service';
import { AnalyticsService } from '../../services/analytics.service';

import { PROFILE_CONFIG } from '../../config/profile.config';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {
  protected readonly isMenuOpen = signal(false);
  protected readonly photoUrl = 'me.webp';
  protected readonly config = PROFILE_CONFIG;
  protected readonly activeSection = signal<string>('home');
  private isBrowser: boolean;

  constructor(
    protected themeService: ThemeService,
    private analyticsService: AnalyticsService,
    private router: Router,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    
    // Listen to route changes
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      if (event.url.startsWith('/blog')) {
        this.activeSection.set('blog');
      }
    });
  }

  ngOnInit() {
    // Initial check
    this.onWindowScroll();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (!this.isBrowser) return;

    // Don't update active section on scroll if we are on the blog page
    if (this.router.url.startsWith('/blog')) {
      this.activeSection.set('blog');
      return;
    }

    const sections = ['home', 'about', 'projects', 'contact'];
    const scrollPosition = window.scrollY + 100; // Offset for navbar

    for (const section of sections) {
      const element = document.getElementById(section);
      if (element) {
        const offsetTop = element.offsetTop;
        const offsetBottom = offsetTop + element.offsetHeight;

        if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
          this.activeSection.set(section);
          break;
        }
      }
    }
  }

  toggleMenu() {
    this.isMenuOpen.update(value => !value);
  }

  closeMenu() {
    this.isMenuOpen.set(false);
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  trackResumeDownload() {
    this.analyticsService.trackEvent('Engagement', 'Click', 'Download Resume (Sidebar)');
  }
}
