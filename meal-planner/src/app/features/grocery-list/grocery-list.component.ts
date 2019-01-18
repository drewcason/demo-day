import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { GroceryListService } from './grocery-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-grocery-list',
  templateUrl: './grocery-list.component.html',
  styleUrls: ['./grocery-list.component.scss']
})
export class GroceryListComponent implements OnInit {
  grocery_list: string[];
  private subscriptions: Subscription[] = [];
  constructor(
    private groceryService: GroceryListService,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.getThisWeeksGroceryList();
  }

  getThisWeeksGroceryList(): void {
    this.subscriptions.push(
      this.groceryService.GroceryList$.subscribe(
        (groceryListResponse: any) => {
          if ( groceryListResponse) {
            let groceries = groceryListResponse;
            let justIngredients = groceries.map(element => {
              return { ingredient: element.ingredient, id: element.id };
            })
            this.grocery_list = justIngredients.sort().reduce((accumulator, current) => {
              const length = accumulator.length
              if (length === 0 || accumulator[length - 1].ingredient !== current.ingredient) {
                  accumulator.push(current);
              } else if (accumulator[length-1].ingredient === current.ingredient && !accumulator[length-1].count) {
                  accumulator[length-1].count = 2;
              } else if (accumulator[length-1].ingredient === current.ingredient && accumulator[length-1].count) {
                  accumulator[length-1].count += 1;
              }
              return accumulator;
            }, []);
          
          }
        }
      )
    )
    this.groceryService.getGroceryList();
  }

  removeItemFromGroceryList(id) {
    this.groceryService.removeItemFromGroceryList(id).subscribe((value) => {
      this.getThisWeeksGroceryList();
      this.changeDetector.detectChanges();
    });
  }

}
