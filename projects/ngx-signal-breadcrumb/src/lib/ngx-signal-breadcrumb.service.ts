import { Injectable, signal } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NgxSignalBreadcrumbService<T> {
  breadcrumbs = signal<T[]>([]);
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.initBreadcrumbs();
  }

  private initBreadcrumbs() {
    this.getBreadcrumbs(this.activatedRoute.root);
    this.router.events
      .pipe(
        takeUntilDestroyed(),
        filter((event) => event instanceof NavigationEnd)
      )
      .subscribe(() => {
        this.getBreadcrumbs(this.activatedRoute.root);
      });
  }

  private getBreadcrumbs(route: ActivatedRoute) {
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      return;
    }

    for (const child of children) {
      child.data.subscribe((data) => {
        const breadcrumbs = data['breadcrumbs'];
        if (breadcrumbs && breadcrumbs.length) {
          this.breadcrumbs.set(breadcrumbs);
        }
      });

      this.getBreadcrumbs(child);
    }
  }

  updateAllBreadcrumbs(breadcrumbs: T[]) {
    this.breadcrumbs.set(breadcrumbs);
  }

  updateBreadcrumbAtIndex(index: number, breadcrumb: T) {
    this.breadcrumbs.update((breadcrumbs) => {
      const updatedBreadcrumbs = [...breadcrumbs];
      updatedBreadcrumbs[index] = breadcrumb;
      return updatedBreadcrumbs;
    });
  }

  pushBreadcrumb(breadcrumb: T) {
    this.breadcrumbs.update((breadcrumbs) => [...breadcrumbs, breadcrumb]);
  }
}
