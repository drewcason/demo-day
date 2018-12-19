import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from 'src/app/recipe';
import { RecipeService } from 'src/app/recipes.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit {
  showInstructions: boolean;
  private subscriptions: Subscription[] = [];
  @Input() recipe: Recipe;
  constructor(
    private recipeService: RecipeService
  ) { }

  ngOnInit() {
    this.showInstructions = false;
    this.subscribeToRecipeInstructionsVisibility();
  }

  subscribeToRecipeInstructionsVisibility(): void {
    this.subscriptions.push(
      this.recipeService.ShowRecipeInstructions$.subscribe(
        (state) => {
          this.showInstructions = state;
        }
      )
    )
  }
  
}
