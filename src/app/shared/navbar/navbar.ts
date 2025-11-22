import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../services/theme.service';
import { AnalyticsService } from '../../services/analytics.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class NavbarComponent {
  protected readonly isMenuOpen = signal(false);
  protected readonly photoUrl = '/me.png';
  protected readonly name = 'Ranju Gamage';
  protected readonly role = 'Full-Stack Developer';

  constructor(
    protected themeService: ThemeService,
    private analyticsService: AnalyticsService
  ) {}

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
