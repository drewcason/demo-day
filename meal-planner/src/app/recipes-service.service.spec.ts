import { TestBed } from '@angular/core/testing';

import { RecipesServiceService } from './recipes-service.service';

describe('RecipesServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RecipesServiceService = TestBed.get(RecipesServiceService);
    expect(service).toBeTruthy();
  });
});
