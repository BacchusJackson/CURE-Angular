import { TestBed } from '@angular/core/testing';

import { ApiURLsService } from './api-urls.service';

describe('ApiURLsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiURLsService = TestBed.get(ApiURLsService);
    expect(service).toBeTruthy();
  });
});
