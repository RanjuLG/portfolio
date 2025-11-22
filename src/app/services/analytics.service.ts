import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  
  constructor() { }

  /**
   * Track a user event
   * @param category Event category (e.g., 'Engagement', 'Navigation')
   * @param action Event action (e.g., 'Click', 'Scroll')
   * @param label Event label (e.g., 'Download Resume', 'View Project')
   * @param value Optional numeric value
   */
  trackEvent(category: string, action: string, label: string, value?: number): void {
    // In a real app, this would send data to Google Analytics, Mixpanel, etc.
    // For now, we'll log it to the console to demonstrate functionality.
    console.log(`[Analytics] ${category} - ${action}: ${label}`, value ? `(${value})` : '');
  }
}
