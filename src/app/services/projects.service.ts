import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

export interface Project {
  id: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  technologies: string[];
  role: string;
  thumbnailUrl: string;
  screenshots: string[];
  challengesAndSolutions?: { challenge: string; solution: string }[];
  githubUrlFE: string;
  githubUrlBE: string;
  liveUrl: string;
  ongoing?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private projects$: Observable<Project[]> | null = null;

  constructor(private http: HttpClient) {}

  /**
   * Get all projects from JSON file
   * Cached to avoid multiple HTTP requests
   */
  getProjects(): Observable<Project[]> {
    if (!this.projects$) {
      this.projects$ = this.http.get<Project[]>('projects.json').pipe(
        shareReplay(1)
      );
    }
    return this.projects$;
  }

  /**
   * Get a single project by ID
   */
  getProjectById(id: string): Observable<Project | undefined> {
    return this.getProjects().pipe(
      map(projects => projects.find(project => project.id === id))
    );
  }

  /**
   * Get projects by technology
   */
  getProjectsByTechnology(technology: string): Observable<Project[]> {
    return this.getProjects().pipe(
      map(projects => 
        projects.filter(project => 
          project.technologies.some(tech => 
            tech.toLowerCase().includes(technology.toLowerCase())
          )
        )
      )
    );
  }
}
