import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipesModalComponent } from './recipes-modal.component';

describe('RecipesModalComponent', () => {
  let component: RecipesModalComponent;
  let fixture: ComponentFixture<RecipesModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipesModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
