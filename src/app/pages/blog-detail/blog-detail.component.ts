import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BlogService, BlogPost } from '../../services/blog.service';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { Document, BLOCKS } from '@contentful/rich-text-types';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './blog-detail.html',
  styleUrls: ['./blog-detail.css']
})
export class BlogDetailComponent implements OnInit {
  post = signal<BlogPost | undefined>(undefined);
  loading = signal<boolean>(true);
  contentHtml = signal<string>('');

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.loadPost(id);
      }
    });
  }

  loadPost(id: string) {
    this.loading.set(true);
    this.blogService.getPostBySlug(id).subscribe({
      next: (post) => {
        this.post.set(post);
        if (post && post.content) {
          // Render rich text to HTML with options for embedded assets
          const options = {
            renderNode: {
              [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
                const asset = node.data.target;
                if (asset && asset.fields && asset.fields.file) {
                  let url = asset.fields.file.url;
                  if (url.startsWith('//')) {
                    url = 'https:' + url;
                  }
                  return `<img src="${url}" alt="${asset.fields.title || 'Image'}" class="embedded-image" />`;
                }
                return '';
              }
            }
          };
          const html = documentToHtmlString(post.content as Document, options);
          this.contentHtml.set(html);
        }
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error loading post:', err);
        this.loading.set(false);
      }
    });
  }
}
