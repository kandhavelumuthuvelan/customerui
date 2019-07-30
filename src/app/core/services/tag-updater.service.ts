import { Injectable } from '@angular/core';
import { Meta } from '@angular/platform-browser';
@Injectable({
  providedIn: 'root'
})
export class TagUpdaterService {

  constructor(private meta: Meta) { }
    generateTags(config) {
      // default values
      config = {
        title: 'Angular <3 Linkbots',
        description: 'My SEO friendly Angular Component',
        image: 'https://example.com/images/logo.png',
        slug: '',
        ...config
      }

      this.meta.updateTag({ name: 'twitter:card', content: 'summary' });
      this.meta.updateTag({ name: 'twitter:site', content: '@content' });
      this.meta.updateTag({ name: 'twitter:title', content: config.title });
      this.meta.updateTag({ name: 'twitter:description', content: config.description });
      this.meta.updateTag({ name: 'twitter:image', content: config.image });
      this.meta.updateTag({ property: 'og:type', content: 'article' });
      this.meta.updateTag({ property: 'og:site_name', content: 'content' });
      this.meta.updateTag({ property: 'og:title', content: config.title });
      this.meta.updateTag({ property: 'og:description', content: config.description });
      this.meta.updateTag({ property: 'og:image', content: config.image });
      this.meta.updateTag({ property: 'og:url', content: `https://www.example.com/${config.slug}` });
    }
}
