import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from 'src/app/recipe';
import { RecipeService } from 'src/app/recipes.service';
import { Subscription } from 'rxjs';
import { MenuService } from '../this-week.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit {
  showInstructions: boolean;
  private subscriptions: Subscription[] = [];
  menu = [];
  @Input() recipe: Recipe;
  constructor(
    private recipeService: RecipeService,
    private menuService: MenuService
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

  addToThisWeekMenu(newRecipe): void {
    this.menuService.postThisWeeksRecipes(newRecipe)
      .subscribe(recipe => this.menu.push(recipe));
  }
}
