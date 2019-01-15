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
              return element.ingredient;
            })
            this.grocery_list = justIngredients.sort().reduce((accumulator, current) => {
              const length = accumulator.length
              if (length === 0 || accumulator[length - 1] !== current) {
                  accumulator.push(current);
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
