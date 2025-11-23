import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { NavbarComponent } from './shared/navbar/navbar';
import { FooterComponent } from './shared/footer/footer';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      // Re-initialize AOS on route change
      setTimeout(() => {
        if (typeof AOS !== 'undefined') {
          AOS.init({
            duration: 800,
            once: false, // Allow animations to repeat on scroll up/down if desired, or keep true
            mirror: true, // Animate elements while scrolling past them
            offset: 100,
            easing: 'ease-out-cubic'
          });
          
          // Refresh AOS on scroll to handle dynamic content
          window.addEventListener('scroll', () => {
            AOS.refresh();
          });

          // Refresh AOS on DOM changes (for lazy loaded content)
          const observer = new MutationObserver(() => {
            AOS.refresh();
          });
          observer.observe(document.body, { childList: true, subtree: true });
        }
      }, 100);
    });
  }
}
