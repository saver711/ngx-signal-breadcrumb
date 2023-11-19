# NgxSignalBreadcrumb

non-opinionated Angular breadcrumbs service

## Installation

```bash
  npm i ngx-signal-breadcrumb
  # or
  yarn add ngx-signal-breadcrumb
```

## Usage/Examples (Inside components)

### (1) With third-party packages (e.g primeng)

#### TS

```javascript
import { Component, effect, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { NgxSignalBreadcrumbService } from 'ngx-signal-breadcrumb';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'ng-breadcrumb',
  standalone: true,
  imports: [CommonModule, BreadcrumbModule],
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent implements OnInit {
  items: MenuItem[] = [];
  home: MenuItem | undefined;

  constructor( private ngxSignalBreadcrumbService: NgxSignalBreadcrumbService<MenuItem>) {
    effect(() => {
      this.items = [...ngxSignalBreadcrumbService.breadcrumbs()];
    });
  }

  ngOnInit(): void {
    this.home = { icon: 'pi pi-home', routerLink: '/dashboard' };
  }
}

```

#### HTML

```html
<p-breadcrumb [model]="items" [home]="home"></p-breadcrumb>
```

---

### (2) Custom (opinionated) component

#### TS

```javascript
import { Component, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSignalBreadcrumbService } from 'ngx-signal-breadcrumb';

type Breadcrumb = {
  label: string;
  ...
  ...
};

@Component({
  selector: 'ng-breadcrumb',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent {
  breadcrumbs: Breadcrumb[] = [];

  constructor(
    private ngxSignalBreadcrumbService: NgxSignalBreadcrumbService<Breadcrumb>
  ) {
    effect(() => {
      this.breadcrumbs = [...ngxSignalBreadcrumbService.breadcrumbs()];
    });
  }

}

```

#### HTML

```html
<ng-container *ngIf="breadcrumbs.length">
  <div *ngFor="let item of breadcrumbs">{{ item.label }}</div>
</ng-container>
```

## Usage/Examples (In Routes)

```javascript
{
    path: 'whatever',
    component: WhateverComponent,
    data: {
      breadcrumbs: [
        {
          label: 'whatever',
          routerLink: '/whatever',
        },
        {
          label: 'New',
          routerLink: '/whatever/new',
        },
      ],
    },
  }
```

---

## Methods

- updateAllBreadcrumbs(breadcrumbs: T[])
- updateBreadCrumbAtIndex(index: number, breadcrumb: T)
- pushBreadCrumb(breadcrumb: T)

## Author

[@AhmedHassan](https://www.linkedin.com/in/ahmedhassan711/)
