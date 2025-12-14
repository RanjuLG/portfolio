import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProjectsService, Project } from '../../services/projects.service';

@Component({
  selector: 'app-project-detail',
  imports: [CommonModule],
  templateUrl: './project-detail.html',
  styleUrl: './project-detail.css'
})
export class ProjectDetailComponent implements OnInit {
  protected readonly project = signal<Project | null>(null);
  protected readonly loading = signal(true);
  protected readonly error = signal<string | null>(null);
  protected readonly selectedImage = signal<string | null>(null);
  protected readonly currentImageIndex = signal<number>(0);
  protected readonly credentialsExpanded = signal<boolean>(false);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectsService: ProjectsService
  ) {}

  ngOnInit() {
    const projectId = this.route.snapshot.paramMap.get('id');
    if (projectId) {
      this.loadProject(projectId);
    } else {
      this.error.set('Project ID not provided');
      this.loading.set(false);
    }
  }

  private loadProject(id: string) {
    this.projectsService.getProjectById(id).subscribe({
      next: (project) => {
        if (project) {
          this.project.set(project);
        } else {
          this.error.set('Project not found');
        }
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error loading project:', err);
        this.error.set('Failed to load project details');
        this.loading.set(false);
      }
    });
  }

  goBack() {
    this.router.navigate(['/projects']);
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

  scrollToGallery() {
    const gallerySection = document.getElementById('screenshots-section');
    if (gallerySection) {
      gallerySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  openImage(imagePath: string, index: number) {
    this.selectedImage.set(this.getImageUrl(imagePath));
    this.currentImageIndex.set(index);
  }

  closeImage() {
    this.selectedImage.set(null);
  }

  nextImage() {
    const screenshots = this.project()?.screenshots;
    if (!screenshots) return;
    const nextIndex = (this.currentImageIndex() + 1) % screenshots.length;
    this.currentImageIndex.set(nextIndex);
    this.selectedImage.set(this.getImageUrl(screenshots[nextIndex]));
  }

  previousImage() {
    const screenshots = this.project()?.screenshots;
    if (!screenshots) return;
    const prevIndex = (this.currentImageIndex() - 1 + screenshots.length) % screenshots.length;
    this.currentImageIndex.set(prevIndex);
    this.selectedImage.set(this.getImageUrl(screenshots[prevIndex]));
  }

  toggleCredentials() {
    this.credentialsExpanded.set(!this.credentialsExpanded());
  }
}
