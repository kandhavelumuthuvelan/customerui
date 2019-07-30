import { Router, NavigationEnd } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { TagUpdaterService } from './core/services/tag-updater.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  // title = 'UI';

  Subscription: Subscription;

  constructor(
    private _route: Router,
    private tagUpdater:TagUpdaterService
  ) { }

  ngOnInit() {
    this.Subscription = this._route.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => window.scroll(0, 0));
    this.tagUpdater.generateTags({
      title: 'About Page',
      description: 'Contact me through this awesome search engine optimized Angular component',
      image: 'https://www.example.com/assets/meerkat.jpeg',
      slug: 'about-page'
    });
  }

  ngOnDestroy(): void {
    this.Subscription.unsubscribe();
  }
}
