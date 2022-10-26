import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs';

export type SEOUpdateData = {
  titleAll?: string | null;
  descriptionAll?: string | null;
  title?: string | null;
  description?: string | null;
  ogTitle?: string | null;
  ogDescription?: string | null;
  ogUrl?: string | null;
  ogType?: 'website' | 'audio' | 'video' | null;
  ogImage?: string | null;
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player' | null;
};

@Injectable({
  providedIn: 'root',
})
export class SEOService {
  constructor(
    private title: Title,
    private meta: Meta,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.activatedRoute),
        map((route) => {
          while (route.firstChild) route = route.firstChild;
          return route;
        }),
        filter((route) => route.outlet === 'primary'),
        mergeMap((route) => route.data),
      )
      .subscribe((event: SEOUpdateData) => {
        this.update(event);
      });
  }

  updateTitle(title: string) {
    this.title.setTitle(title);
  }

  updateDescription(desc: string) {
    this.meta.updateTag({ name: 'description', content: desc });
  }

  updateTwitterCard(summary: string) {
    this.meta.updateTag({ name: 'twitter:card', content: summary });
  }

  updateOgTitle(title: string) {
    this.meta.updateTag({ name: 'og:url', content: title });
  }

  updateOgType(type: string) {
    this.meta.updateTag({ name: 'og:type', content: type });
  }

  updateOgUrl(url: string) {
    this.meta.updateTag({ name: 'og:url', content: url });
  }

  updateOgImage(url: string) {
    this.meta.updateTag({ name: 'og:image', content: url });
  }

  updateOgDescription(desc: string) {
    this.meta.updateTag({ name: 'description', content: desc });
  }

  updateAllDescription(desc: string) {
    this.updateDescription(desc);
    this.updateOgDescription(desc);
  }

  updateAllTitle(title: string) {
    this.updateTitle(title);
    this.updateOgTitle(title);
  }

  update(updates: SEOUpdateData) {
    if (updates.titleAll) this.updateAllTitle(updates.titleAll);
    else {
      this.updateTitle(updates.title ?? 'RUCOGS');
      this.updateOgTitle(updates.ogTitle ?? 'RUCOGS');
    }

    if (updates.descriptionAll) this.updateAllDescription(updates.descriptionAll);
    else {
      this.updateDescription(updates.description ?? 'Creation of Game Society at Rutgers');
      this.updateOgDescription(updates.ogDescription ?? 'Creation of Game Society at Rutgers');
    }

    this.updateOgUrl(updates.ogUrl ?? window.location.href);
    if (updates.ogImage) {
      if (!updates.ogImage.includes('://')) updates.ogImage = window.location.origin + '/' + updates.ogImage;
      this.updateOgImage(updates.ogImage);
    } else this.updateOgImage('');
    this.updateOgType(updates.ogType ?? 'website');
    this.updateTwitterCard(updates.twitterCard ?? 'summary');
  }
}
