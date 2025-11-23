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
      items: ['C#', '.NET Core', 'ASP.NET', 'Node.js', 'RESTful APIs', 'Entity Framework']
    },
    {
      category: 'Database',
      items: ['SQL Server', 'MongoDB', 'PostgreSQL', 'Firebase']
    },
    {
      category: 'Tools & Cloud',
      items: ['Git', 'Azure', 'Docker', 'VS Code', 'Visual Studio', 'Postman']
    }
  ];

  protected readonly experience: TimelineItem[] = [
    {
      title: 'Full-Stack Developer',
      subtitle: 'Tech Solutions Inc.',
      duration: '2022 - Present',
      description: 'Developed and maintained enterprise-level web applications using Angular and .NET Core. Led the development of a task management system serving 10,000+ users.'
    },
    {
      title: 'Software Developer',
      subtitle: 'Digital Innovations Ltd.',
      duration: '2020 - 2022',
      description: 'Built responsive web applications and RESTful APIs. Collaborated with cross-functional teams to deliver high-quality software solutions.'
    },
    {
      title: 'Junior Developer',
      subtitle: 'StartUp Ventures',
      duration: '2019 - 2020',
      description: 'Assisted in developing mobile applications using .NET MAUI. Gained experience in full software development lifecycle.'
    }
  ];

  protected readonly education: TimelineItem[] = [
    {
      title: 'Bachelor of Science in Computer Science',
      subtitle: 'University of Technology',
      duration: '2015 - 2019',
      description: 'Graduated with honors. Focused on software engineering, databases, and web technologies.'
    },
    {
      title: 'Certified Azure Developer',
      subtitle: 'Microsoft Certification',
      duration: '2021',
      description: 'Achieved Microsoft Azure Developer Associate certification.'
    }
  ];
}
