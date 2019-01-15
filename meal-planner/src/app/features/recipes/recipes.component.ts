import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { Recipe } from 'src/app/recipe';
import { RecipeService } from 'src/app/recipes.service';
import { Subscription } from 'rxjs';
import { MenuService } from '../this-week.service';
import { GroceryListService } from '../grocery-list/grocery-list.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit {
  showInstructions: boolean;
  private subscriptions: Subscription[] = [];
  menu = [];
  grocery_list = [];
  isAdded: boolean;
  @Input() recipe: Recipe;
  constructor(
    private recipeService: RecipeService,
    private menuService: MenuService,
    private groceryService: GroceryListService,
    private changeDetector: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.subscribeToRecipeInstructionsVisibility();
    this.subscribeToMenu();
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

  subscribeToMenu(): void {
    this.menu = [];
    this.subscriptions.push(
      this.menuService.Menu$.subscribe(
        (menuResponse: Recipe[]) => {
          if (menuResponse) {
            this.menu = menuResponse;
          }
        }
      )
    )
  }

  addToThisWeekMenu(newRecipe): void {
    this.menuService.postThisWeeksRecipes(newRecipe).subscribe();
    this.isAdded = true;
  }

  markAsAddedToMenu(id): void {
    this.menuService.updateRecipeAddedToMenu(id).subscribe();
  }

  addItemsToGroceryList(items) {
    items.forEach(element => {
      this.groceryService.postItemsToGroceryList(element).subscribe();
    })
  }
}
