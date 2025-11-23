import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalyticsService } from '../../services/analytics.service';
import { SeoService } from '../../services/seo.service';

interface Skill {
  category: string;
  items: string[];
}

interface TimelineItem {
  title: string;
  subtitle: string;
  duration: string;
  description: string;
  details?: string[];
  clients?: string[];
  projects?: string[];
}

@Component({
  selector: 'app-about',
  imports: [CommonModule],
  templateUrl: './about.html',
  styleUrl: './about.css'
})
export class AboutComponent {
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

  trackResumeDownload() {
    this.analyticsService.trackEvent('Engagement', 'Click', 'Download Resume (About)');
  }
  protected readonly introduction = `I'm a passionate Full-Stack Developer with expertise in building robust web and mobile applications. With a strong foundation in both frontend and backend technologies, I create seamless digital experiences that solve real-world problems. I thrive in collaborative environments and am constantly learning new technologies to stay at the forefront of software development.`;

  protected readonly skills: Skill[] = [
    {
      category: 'Frontend',
      items: ['Angular', 'React', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Responsive Design']
    },
    {
      category: 'Backend',
      items: ['C#', '.NET Core','.NET', 'ASP.NET','RESTful APIs', 'Entity Framework']
    },
    {
      category: 'Database',
      items: ['SQL Server', 'MongoDB', 'PostgreSQL', 'MySQL']
    },
    {
      category: 'Tools & Cloud',
      items: ['Azure','VS Code', 'Visual Studio', 'Postman']
    },
    {
      category: 'Version Control',
      items: ['Git', 'GitHub','GitLab']
    },
    {
      category: 'Project Management',
      items: ['Jira','Trello']
    }
  ];

  protected readonly experience: TimelineItem[] = [
    {
      title: 'Software Engineer',
      subtitle: 'DSP Engineering Solutions Pvt. Ltd.',
      duration: '2023 - Present',
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
      ]
      ,
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
    }
  ];
}
