import { Component, signal, HostListener, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ThemeService } from '../../services/theme.service';
import { AnalyticsService } from '../../services/analytics.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class NavbarComponent {
  protected readonly isMenuOpen = signal(false);
  protected readonly photoUrl = '/me.png';
  protected readonly name = 'Ranju Gamage';
  protected readonly role = 'Full-Stack Developer';
  protected readonly activeSection = signal<string>('home');
  private isBrowser: boolean;

  constructor(
    protected themeService: ThemeService,
    private analyticsService: AnalyticsService,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    // Initial check
    this.onWindowScroll();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (!this.isBrowser) return;

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
