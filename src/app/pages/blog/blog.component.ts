import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BlogService, BlogPost } from '../../services/blog.service';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './blog.html',
  styleUrls: ['./blog.css']
})
export class BlogComponent implements OnInit {
  allPosts = signal<BlogPost[]>([]);
  searchQuery = signal<string>('');
  loading = signal<boolean>(true);

  posts = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    if (!query) {
      return this.allPosts();
    }
    return this.allPosts().filter(post =>
      post.title.toLowerCase().includes(query)
    );
  });

  constructor(private blogService: BlogService) {}

  ngOnInit() {
    this.blogService.getPosts().subscribe({
      next: (posts) => {
        this.allPosts.set(posts);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error fetching posts:', err);
        this.loading.set(false);
      }
    });
  }

  onSearchChange(query: string) {
    this.searchQuery.set(query);
  }
}
