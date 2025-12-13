import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalyticsService } from '../../services/analytics.service';
import { SeoService } from '../../services/seo.service';

interface Skill {
  category: string;
  items: string[];
  icon: string;
}

interface TimelineItem {
  title: string;
  subtitle: string;
  duration: string;
  description: string;
  details?: string[];
  clients?: string[];
  projects?: string[];
  logo?: string;
  logoAlt?: string;
  technologies?: string[];
  startDate?: string;
  endDate?: string;
  isCurrent?: boolean;
}

interface ParsedProject {
  name: string;
  technologies: string[];
}

import { PROFILE_CONFIG } from '../../config/profile.config';

@Component({
  selector: 'app-about',
  imports: [CommonModule],
  templateUrl: './about.html',
  styleUrl: './about.css'
})
export class AboutComponent {
  protected readonly config = PROFILE_CONFIG;
  private expandedSections = new Set<string>();

  constructor(
    private analyticsService: AnalyticsService,
    private seoService: SeoService
  ) {
    this.seoService.updateMetaTags({
      title: 'About Me',
      description: 'Learn about my background, skills, and experience as a Full-Stack Developer.',
      slug: 'about'
    });
  }

  isExpanded(sectionId: string): boolean {
    return this.expandedSections.has(sectionId);
  }

  toggleSection(sectionId: string): void {
    if (this.expandedSections.has(sectionId)) {
      this.expandedSections.delete(sectionId);
    } else {
      this.expandedSections.add(sectionId);
    }
  }

  formatDuration(item: TimelineItem): string {
    if (!item.startDate || !item.endDate) return item.duration;
    
    const start = new Date(item.startDate);
    const end = item.endDate === 'present' ? new Date() : new Date(item.endDate);
    
    const months = (end.getFullYear() - start.getFullYear()) * 12 
                  + (end.getMonth() - start.getMonth());
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    
    const parts = [];
    if (years > 0) parts.push(`${years} year${years > 1 ? 's' : ''}`);
    if (remainingMonths > 0) parts.push(`${remainingMonths} month${remainingMonths > 1 ? 's' : ''}`);
    
    return parts.length > 0 ? `${item.duration} (${parts.join(' ')})` : item.duration;
  }

  parseProject(projectString: string): ParsedProject {
    const parts = projectString.split(' - ');
    const name = parts[0]?.trim() || '';
    const techStack = parts[1] ? parts[1].split(',').map(t => t.trim()) : [];
    
    return { name, technologies: techStack };
  }

  trackResumeDownload() {
    this.analyticsService.trackEvent('Engagement', 'Click', 'Download Resume (About)');
  }
  protected readonly introduction = `I'm a passionate <span class="highlight">Software Engineer</span> with expertise in building robust web and mobile applications. Currently, I am reading for my <span class="highlight">MSc. in Computer Science</span> at the <span class="highlight">Postgraduate Institute of Science, University of Peradeniya</span>, and hold a <span class="highlight">BSc. (Eng) Hons.</span> from the <span class="highlight">Faculty of Engineering, University of Peradeniya</span>. With a strong foundation in both <span class="highlight">frontend and backend technologies</span>, and with <span class="highlight">2+ years of experience</span>, I create seamless digital experiences that solve real-world problems. I thrive in collaborative environments and am constantly learning new technologies to stay at the forefront of software development.`;

  protected readonly skills: Skill[] = [
    {
      category: 'Backend',
      items: ['C#','.NET', 'ASP.NET','Entity Framework'],
      icon: 'M20 13H4c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h16c.55 0 1-.45 1-1v-6c0-.55-.45-1-1-1zM7 19c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM20 3H4c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h16c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1zM7 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z'
    },
    {
      category: 'Frontend',
      items: ['Angular', 'React', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3'],
      icon: 'M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z'
    },
    {
      category: 'Cloud & DevOps',
      items: ['Azure App Service', 'Azure Functions', 'Azure SQL Database', 'Azure DevOps','GitHub Actions'],
      icon: 'M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z'
    },
    {
      category: 'Database',
      items: ['SQL Server', 'PostgreSQL', 'MySQL', 'MongoDB'],
      icon: 'M12 3C7.58 3 4 4.79 4 7s3.58 4 8 4 8-1.79 8-4-3.58-4-8-4zm8 6c0 2.21-3.58 4-8 4s-8-1.79-8-4v3c0 2.21 3.58 4 8 4s8-1.79 8-4V9zm0 5c0 2.21-3.58 4-8 4s-8-1.79-8-4v3c0 2.21 3.58 4 8 4s8-1.79 8-4v-3z'
    },
    {
      category: 'Tools',
      items: ['VS Code', 'Visual Studio', 'Postman'],
      icon: 'M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z'
    },
    {
      category: 'Version Control',
      items: ['Git', 'GitHub','GitLab'],
      icon: 'M22 11V3h-7v3H9V3H2v8h7V8h2v10h4v3h7v-8h-7v3h-2V8h2v3z'
    },
    {
      category: 'Project Management',
      items: ['Jira','Trello','Agile/Scrum'],
      icon: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z'
    }
  ];

  protected readonly experience: TimelineItem[] = [
    {
      title: 'Software Engineer',
      subtitle: 'DSP Engineering Solutions Pvt. Ltd.',
      duration: 'Aug 2023 - Present',
      startDate: '2023-08-01',
      endDate: 'present',
      isCurrent: true,
      logo: 'assets/companies/dsp.png',
      logoAlt: 'DSP Engineering Solutions',
      technologies: ['.NET', 'Angular', 'SQL Server', 'MongoDB', 'Azure', 'C#', 'TypeScript'],
      description: 'Designing and developing building automation software solutions for Singapore-based clients using .NET and Angular.',
      details: [
        'Work closely with stakeholders throughout the Software Development Life Cycle (SDLC) — from requirement gathering to software design, testing, deployment, and ongoing maintenance',
        'Responsible for deploying applications to production servers, ensuring stability and smooth operation in live environments',
        'Designed and implemented RESTful APIs and Services to streamline data communication and improve system efficiency',
        'Developed Windows services for real-time data processing and analytics, enhancing system performance'
      ],
      projects: [
        'Energy Management System - ASP.NET Core Web API, Windows Service (.NET Framework), Angular, SQL Server, MongoDB',
        'Integration of Maintenance Management System with User Management System - ASP.NET Core Web API, Angular',
        'Tenant Billing System Configuration Module - ASP.NET Core Web API, Angular, SQL Server',
        'Windows Desktop Application for Licence Verification - C# Windows Forms'
      ],
      clients: [
        'Nanyang Technological University (NTU) - Singapore',
        'Singapore University of Technology and Design (SUTD)',
        'IOI Central Boulevard Towers - Singapore',
        'Marina One - Singapore'
      ]
    }
  ];

  protected readonly education: TimelineItem[] = [
    {
      title: 'Master of Science in Computer Science (Reading)',
      subtitle: 'Postgraduate Institute of Science, University of Peradeniya',
      duration: '2024 - Present',
      description: ''
    },
    {
      title: 'Bachelor of the Science of Engineering Honours',
      subtitle: 'Faculty of Engineering, University of Peradeniya',
      duration: '2017 - 2023',
      description: ''
    },
    {
      title: 'GCE A/L Examination - Physical Science',
      subtitle: 'Ranabima Royal College, Peradeniya',
      duration: '2013 - 2016',
      description: 'Physics - A, Chemistry - A, Combined Maths - B'
    },
    {
      title: 'GCE O/L Examination',
      subtitle: 'Ranabima Royal College, Peradeniya',
      duration: '2007 - 2012',
      description: '8A, 1C'
    }
  ];
}
