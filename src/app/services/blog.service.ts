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
  tags?: string[];
  category?: string;
  coverImage?: {
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

  private fixUrl(url: string): string {
    if (url && url.startsWith('//')) {
      return 'https:' + url;
    }
    return url;
  }

  private createAssetMap(includes: any): Map<string, any> {
    const assetMap = new Map<string, any>();
    if (includes && includes.Asset) {
      includes.Asset.forEach((asset: any) => {
        assetMap.set(asset.sys.id, asset);
      });
    }
    return assetMap;
  }

  private resolveRichTextAssets(content: any, assetMap: Map<string, any>) {
    if (!content || !content.content) return;

    content.content.forEach((node: any) => {
      if (node.nodeType === 'embedded-asset-block') {
        const assetId = node.data?.target?.sys?.id;
        if (assetId && assetMap.has(assetId)) {
          node.data.target = assetMap.get(assetId);
        }
      }
      if (node.content) {
        this.resolveRichTextAssets(node, assetMap);
      }
    });
  }

  getPosts(): Observable<BlogPost[]> {
    return from(this.client.withoutLinkResolution.getEntries({
      content_type: 'blog',
      order: ['-sys.createdAt']
    })).pipe(
      map((entries: any) => {
        const assetMap = this.createAssetMap(entries.includes);
        
        return entries.items.map((item: any) => {
          const fields = item.fields;
          let coverImage = fields.featuredImage;

          // Resolve cover image if it's a link
          if (coverImage?.sys?.type === 'Link' && coverImage?.sys?.linkType === 'Asset') {
            coverImage = assetMap.get(coverImage.sys.id);
          }

          if (coverImage?.fields?.file?.url) {
            coverImage.fields.file.url = this.fixUrl(coverImage.fields.file.url);
          }

          // Deep clone content to avoid mutating the original object and ensure we can modify it
          let content = fields.content;
          if (content) {
            content = JSON.parse(JSON.stringify(content));
            this.resolveRichTextAssets(content, assetMap);
          }

          return {
            title: fields.title,
            slug: item.sys.id,
            publishedDate: item.sys.createdAt,
            excerpt: fields.description,
            content: content,
            tags: fields.tags,
            category: fields.category,
            coverImage: coverImage
          } as BlogPost;
        });
      })
    );
  }

  getPostBySlug(id: string): Observable<BlogPost | undefined> {
    return from(this.client.withoutLinkResolution.getEntries({
      'sys.id': id,
      content_type: 'blog',
      include: 1
    })).pipe(
      map((entries: any) => {
        if (entries.items.length > 0) {
          const assetMap = this.createAssetMap(entries.includes);
          const item = entries.items[0];
          const fields = item.fields;
          
          let coverImage = fields.featuredImage;

          // Resolve cover image if it's a link
          if (coverImage?.sys?.type === 'Link' && coverImage?.sys?.linkType === 'Asset') {
            coverImage = assetMap.get(coverImage.sys.id);
          }

          if (coverImage?.fields?.file?.url) {
            coverImage.fields.file.url = this.fixUrl(coverImage.fields.file.url);
          }

          // Deep clone content
          let content = fields.content;
          if (content) {
            content = JSON.parse(JSON.stringify(content));
            this.resolveRichTextAssets(content, assetMap);
          }

          return {
            title: fields.title,
            slug: item.sys.id,
            publishedDate: item.sys.createdAt,
            excerpt: fields.description,
            content: content,
            tags: fields.tags,
            category: fields.category,
            coverImage: coverImage
          } as BlogPost;
        }
        return undefined;
      })
    );
  }
}
