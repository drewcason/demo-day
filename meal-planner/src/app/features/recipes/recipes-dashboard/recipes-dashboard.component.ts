import { Component, OnInit } from '@angular/core';
import { RecipeService } from 'src/app/recipes.service';
import { Recipe, RecipeRes } from 'src/app/recipe';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-recipes-dashboard',
  templateUrl: './recipes-dashboard.component.html',
  styleUrls: ['./recipes-dashboard.component.scss']
})
export class RecipesDashboardComponent implements OnInit {
  recipes: Recipe[] = [];
  errorMessage: string;
  showRecipeInstructions: boolean = true;
  private subscriptions: Subscription[] = [];
  constructor( private recipeService: RecipeService) { }

  ngOnInit() {
    this.getRecipesInfo();
  }

  subscribeToRecipeInstructionsVisibility(): void {
    this.subscriptions.push(
      this.recipeService.ShowRecipeInstructions$.subscribe(
        (state) => {
          this.showRecipeInstructions = state;
        }
      )
    )
  }

  toggleRecipeInstructions(): void {
    this.recipeService.toggleRecipeInstructions();
  }

  getRecipesInfo(): void {
    this.subscriptions.push(
      this.recipeService.Recipes$.subscribe(
        (recipeResponse: RecipeRes) => {
          this.recipes = recipeResponse.data;
        }
      )
    )
    this.recipeService.getRecipes();
  }
 

}
