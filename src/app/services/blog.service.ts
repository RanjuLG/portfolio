import { Injectable } from '@angular/core';
import { createClient, Entry } from 'contentful';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface BlogPost {
  title: string;
  slug: string;
  publishedDate: string;
  excerpt: string;
  content: any; // Rich Text
  coverImage: {
    fields: {
      file: {
        url: string;
      };
      title: string;
    };
  };
}

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private client = createClient({
    space: environment.contentful.spaceId,
    accessToken: environment.contentful.accessToken
  });

  constructor() {}

  getPosts(): Observable<BlogPost[]> {
    return from(this.client.getEntries({
      content_type: 'blog',
      order: ['-fields.publishedDate']
    })).pipe(
      map(entries => entries.items.map(item => {
        const fields: any = item.fields;
        return {
          title: fields.title,
          slug: item.sys.id, // Use ID as slug since slug field is missing
          publishedDate: fields.publishedDate,
          excerpt: fields.description, // Use description field
          content: fields.content,
          coverImage: fields.featuredImage
        } as BlogPost;
      }))
    );
  }

  getPostBySlug(id: string): Observable<BlogPost | undefined> {
    return from(this.client.getEntry(id)).pipe(
      map(entry => {
        if (entry) {
          const fields: any = entry.fields;
          return {
            title: fields.title,
            slug: entry.sys.id,
            publishedDate: fields.publishedDate,
            excerpt: fields.description,
            content: fields.content,
            coverImage: fields.featuredImage
          } as BlogPost;
        }
        return undefined;
      })
    );
  }
}
