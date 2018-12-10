import { TestBed } from '@angular/core/testing';

import { RecipeService } from './recipes.service';

describe('RecipesServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RecipeService = TestBed.get(RecipeService);
    expect(service).toBeTruthy();
  });
});
