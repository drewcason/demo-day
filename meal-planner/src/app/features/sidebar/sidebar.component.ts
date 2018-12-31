import { Component, OnInit } from '@angular/core';
import { MenuService } from '../this-week.service';
import { RecipeService } from 'src/app/recipes.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
   visible: boolean;


  constructor(
    private menuService: MenuService,
    private recipeService: RecipeService
  ) { }

  ngOnInit() {
  }

  clearThisWeeksRecipes(): void {
    this.menuService.clearThisWeeksRecipes().subscribe();
  }
}
