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
}
