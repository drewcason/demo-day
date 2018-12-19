import { Component, OnInit } from '@angular/core';
import { RecipeService } from 'src/app/recipes.service';
import { Recipe, RecipeRes } from 'src/app/recipe';
import { Subscription } from 'rxjs';
import {InputTextModule} from 'primeng/inputtext';

@Component({
  selector: 'app-recipes-dashboard',
  templateUrl: './recipes-dashboard.component.html',
  styleUrls: ['./recipes-dashboard.component.scss']
})
export class RecipesDashboardComponent implements OnInit {
  recipes: Recipe[] = [];
  _recipeFilter: string;
  
  get recipeFilter(): string {
    return this._recipeFilter;
  }
  set recipeFilter(value:string) {
    this._recipeFilter = value;
    this.filteredRecipes = this.recipeFilter ? this.performFilter(this.recipeFilter) : this.recipes;
  }

  filteredRecipes: Recipe[];
  showRecipeInstructions: boolean;
  private subscriptions: Subscription[] = [];
  
  constructor( 
    private recipeService: RecipeService
    ) {}

  ngOnInit() {
    this.showRecipeInstructions = false;
    this.getRecipesInfo();
    this.subscribeToRecipeInstructionsVisibility();
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

  performFilter(filterBy: string): Recipe[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.recipes.filter((recipe: Recipe) => {
    if(recipe.protein.toLocaleLowerCase().indexOf(filterBy) !== -1 ||
      recipe.title.toLocaleLowerCase().indexOf(filterBy) !== -1 ||
      recipe.season.toLocaleLowerCase().indexOf(filterBy) !== -1 ||
      recipe.ethnicity.toLocaleLowerCase().indexOf(filterBy) !== -1) {
      return true;
    }});
  }

  showInstructions(): void {
    this.recipeService.showRecipeInstructions();
  }

  hideInstructions(): void {
    this.recipeService.hideRecipeInstructions();
  }

  getRecipesInfo(): void {
    this.subscriptions.push(
      this.recipeService.Recipes$.subscribe(
        (recipeResponse: RecipeRes) => {
          this.recipes = recipeResponse.data;
          this.filteredRecipes = this.recipes;
        }
      )
    )
    this.recipeService.getRecipes();
  }
 

}
