import { Meta } from '@angular/platform-browser';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  constructor(private meta: Meta) { }

  generateTags(config) {
    // default values
    config = {
      title: 'An Online Marketplace for All Construction Products & Services | Dooyd',
      description: 'Dooyd - An Online Digital Project Solution Provider. Get Industrial Procurement Materials, Building Plans & Interior Design, Construction Services & Equipment Rentals in Chennai.',
      image: 'https://devdooydstorage.blob.core.windows.net/dooyd/dooydc.png',
      ...config
    };
    this.meta.updateTag({ name: 'twitter:card', content: 'DooyD' });
    this.meta.updateTag({ name: 'twitter:site', content: 'https://dooyd.com' });
    this.meta.updateTag({ name: 'twitter:title', content: config.title });
    this.meta.updateTag({ name: 'twitter:description', content: config.description });
    this.meta.updateTag({ name: 'twitter:image', content: config.image });

    this.meta.updateTag({ property: 'og:type', content: 'article' });
    this.meta.updateTag({ property: 'og:site_name', content: 'AngularFirebase' });
    this.meta.updateTag({ property: 'og:title', content: config.title });
    this.meta.updateTag({ property: 'og:description', content: config.description });
    this.meta.updateTag({ property: 'og:image', content: config.image });
    this.meta.updateTag({ property: 'og:url', content: 'https://dooyd.com' });
  }
}
