import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../recipes.service';
import { Recipe } from '../recipe';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipes-dashboard',
  templateUrl: './recipes-dashboard.component.html',
  styleUrls: ['./recipes-dashboard.component.scss']
})
export class RecipesDashboardComponent implements OnInit {
  recipes: Recipe[] = [];
  recipeFilter: string;
  filteredRecipes: Recipe[];
  showRecipeInstructions: boolean;
  ethnicities: string[];
  proteins: string[];
  seasons: string[];
  private subscriptions: Subscription[] = [];

  constructor(
    private recipeService: RecipeService
    ) {}

  setRecipeFilter(value: string) {
    this.recipeFilter = value;
    this.filteredRecipes = this.recipeFilter ? this.performFilter(this.recipeFilter) : this.recipes;
  }
  set proteinFilter(protein: string) {
    this.recipeFilter = protein;
    this.filteredRecipes = this.recipeFilter ? this.performFilter(this.recipeFilter) : this.recipes;
  }

  ngOnInit() {
    this.getSortedRecipesInfo();
    this.subscribeToRecipes();
    this.subscribeToRecipeInstructionsVisibility();
  }

  setSortingOptions(): void {
    this.ethnicities = ['American', 'Chinese', 'Mexican', 'Italian', 'Spanish', 'Vietnamese'];
    this.proteins = ['Beef', 'Chicken', 'Fish', 'Pork'];
    this.seasons = ['Spring', 'Summer', 'Fall', 'Winter'];
  }

  subscribeToRecipes(): void {
    this.subscriptions.push(
      this.recipeService.Recipes$.subscribe(
        (recipeResponse: Recipe[]) => {
          if (recipeResponse) {
            this.recipes = recipeResponse;
            this.filteredRecipes = this.recipes;
          }
        }
      )
    );
  }

  subscribeToRecipeInstructionsVisibility(): void {
    this.subscriptions.push(
      this.recipeService.ShowRecipeInstructions$.subscribe(
        (state: boolean) => {
          this.showRecipeInstructions = state;
        }
      ));
  }

  performFilter(filterBy: string): Recipe[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.recipes.filter((recipe: Recipe) => {
    if (recipe.protein.toLocaleLowerCase().indexOf(filterBy) !== -1
      || recipe.title.toLocaleLowerCase().indexOf(filterBy) !== -1
      || recipe.season.toLocaleLowerCase().indexOf(filterBy) !== -1
      || recipe.ethnicity.toLocaleLowerCase().indexOf(filterBy) !== -1
      || recipe.breakfast.toLocaleLowerCase().indexOf(filterBy) !== -1) {
        return true;
      }
    });
  }


  toggleInstructions(): void {
    this.recipeService.toggleRecipeInstructions(!this.showRecipeInstructions);
  }

  getSortedRecipesInfo(): void {
    this.recipeService.getSortedRecipes();
  }

  getMostPopularRecipesInfo(): void {
    this.recipeService.getMostPopularRecipes();
  }

  getLeastPopularRecipesInfo(): void {
    this.recipeService.getLeastPopularRecipes();
  }
}
