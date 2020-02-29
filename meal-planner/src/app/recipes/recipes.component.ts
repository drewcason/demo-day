import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
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
export class RecipesComponent implements OnInit {
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
