import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-contact',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export class ContactComponent {
  protected readonly contactForm: FormGroup;
  protected readonly submitting = signal(false);
  protected readonly submitSuccess = signal(false);
  protected readonly submitError = signal<string | null>(null);

  protected readonly contactInfo = {
    email: 'ranjue16@gmail.com',
    linkedin: 'https://linkedin.com/in/ranju-laksahan',
    github: 'https://github.com/RanjuLG'
  };

  constructor(
    private fb: FormBuilder,
    private seoService: SeoService
  ) {
    this.seoService.updateMetaTags({
      title: 'Contact',
      description: 'Get in touch with me for collaboration opportunities or just to say hi.',
      slug: 'contact'
    });

    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required, Validators.minLength(3)]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  get name() { return this.contactForm.get('name'); }
  get email() { return this.contactForm.get('email'); }
  get subject() { return this.contactForm.get('subject'); }
  get message() { return this.contactForm.get('message'); }

  onSubmit() {
    if (this.contactForm.valid) {
      this.submitting.set(true);
      this.submitError.set(null);

      // Simulate form submission
      // TODO: Integrate with Formspree or EmailJS
      setTimeout(() => {
        console.log('Form submitted:', this.contactForm.value);
        this.submitting.set(false);
        this.submitSuccess.set(true);
        this.contactForm.reset();
        
        // Reset success message after 5 seconds
        setTimeout(() => {
          this.submitSuccess.set(false);
        }, 5000);
      }, 1500);
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.contactForm.controls).forEach(key => {
        this.contactForm.get(key)?.markAsTouched();
      });
    }
  }
}
