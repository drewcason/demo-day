import { Component, OnInit, Input, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Recipe } from './recipe';
import { RecipeService } from './recipes.service';
import { Subscription } from 'rxjs';
import { MenuService } from '../this-week/this-week.service';
import { GroceryListService } from '../grocery-list/grocery-list.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit, OnDestroy {
  @Input() recipe: Recipe;
  @Input() showInstructions: boolean;
  menu = [];
  grocery_list = [];
  isAdded: boolean;
  private subscriptions: Subscription[] = [];

  constructor(
    private menuService: MenuService,
    private groceryService: GroceryListService,
  ) { }

  ngOnInit() {
    this.subscribeToMenu();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => {
      if (!sub.closed) {
        sub.unsubscribe();
      }
    });
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
    );
  }

  handleAddRecipeToMenu(recipe: Recipe) {
    this.addToThisWeekMenu(recipe);
    this.addItemsToGroceryList(recipe.grocery_items);
    this.markAsAddedToMenu(recipe.id);
  }

  addToThisWeekMenu(newRecipe: Recipe): void {
    this.menuService.postThisWeeksRecipes(newRecipe);
    this.isAdded = true;
  }

  markAsAddedToMenu(id: number): void {
    this.menuService.updateRecipeAddedToMenu(id).subscribe();
  }

  addItemsToGroceryList(items) {
    items.forEach(element => {
      this.groceryService.postItemsToGroceryList(element);
    });
  }
}
