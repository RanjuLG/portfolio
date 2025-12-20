import { Component, OnInit, signal, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProjectsService, Project } from '../../services/projects.service';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-projects',
  imports: [CommonModule],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectsComponent implements OnInit {
  protected readonly projects = signal<Project[]>([]);
  protected readonly loading = signal(true);
  protected readonly error = signal<string | null>(null);

  constructor(
    private projectsService: ProjectsService,
    private router: Router,
    private seoService: SeoService
  ) {
    this.seoService.updateMetaTags({
      title: 'Projects',
      description: 'Explore my latest projects and case studies demonstrating my technical skills.',
      slug: 'projects'
    });
  }

  ngOnInit() {
    this.loadProjects();
  }

  private loadProjects() {
    this.projectsService.getProjects().subscribe({
      next: (projects) => {
        this.projects.set(projects);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error loading projects:', err);
        this.error.set('Failed to load projects. Please try again later.');
        this.loading.set(false);
      }
    });
  }

  viewProject(projectId: string) {
    this.router.navigate(['/projects', projectId]);
  }

  getImageUrl(imagePath: string): string {
    if (!imagePath) return '';
    // If path already includes 'assets/', return as-is (for backward compatibility)
    if (imagePath.startsWith('assets/') || imagePath.startsWith('http')) {
      return imagePath;
    }
    // Otherwise, prepend the base path
    return `assets/projects/${imagePath}`;
  }
}
