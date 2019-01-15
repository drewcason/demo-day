import { Component, OnInit, OnChanges, ChangeDetectorRef } from '@angular/core';
import { MenuService } from '../this-week.service';
import { Subscription } from 'rxjs';
import { Recipe } from 'src/app/recipe';

@Component({
  selector: 'app-this-week',
  templateUrl: './this-week.component.html',
  styleUrls: ['./this-week.component.scss']
})

export class MenuComponent implements OnInit {
  menu: Recipe[] = [];
  count: number;
  private subscriptions: Subscription[] = [];
  constructor(
    private menuService: MenuService,
    private changeDetector: ChangeDetectorRef
  ) { }

  ngOnInit() { 
    this.getThisWeeksMenu();
  }

  getThisWeeksMenu(): void {
    this.subscriptions.push(
      this.menuService.Menu$.subscribe(
        (menuResponse: Recipe[]) => {
          if ( menuResponse) {
            this.menu = menuResponse;
          }
        }
      )
    )
    this.menuService.getThisWeeksRecipes();
  }

  removeRecipeFromMenu(id) {
    this.menuService.removeRecipeFromMenu(id).subscribe((value) => {
      this.getThisWeeksMenu();
      this.changeDetector.detectChanges();
    });
  }

  uncheckRecipe(id): void {
    this.menuService.updateRecipeRemovedFromMenu(id).subscribe();
  }

  async updateRecipeCountAndRemoveFromMenu(id) {
    for (let i = 0; i < this.menu.length; i++) {
      if ( this.menu[i].id === id ) {
        this.count = this.menu[i].count + 1;
      }
    }
    await this.menuService.updateRecipeCount(id, this.count).subscribe((value) => {
      this.getThisWeeksMenu();
      this.changeDetector.detectChanges();
    });
    this.menuService.removeRecipeFromMenu(id).subscribe((value) => {
      this.getThisWeeksMenu();
      this.changeDetector.detectChanges();
    });
  }
}
