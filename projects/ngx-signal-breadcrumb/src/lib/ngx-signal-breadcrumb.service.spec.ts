import { TestBed } from '@angular/core/testing';

import { NgxSignalBreadcrumbService } from './ngx-signal-breadcrumb.service';

describe('NgxSignalBreadcrumbService', () => {
  let service: NgxSignalBreadcrumbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxSignalBreadcrumbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
