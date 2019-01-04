import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipesDashboardComponent } from './features/recipes/recipes-dashboard/recipes-dashboard.component';
import { GroceryListComponent } from './features/grocery-list/grocery-list.component';
import { SidebarComponent } from './features/sidebar/sidebar.component';
import { MenuComponent } from './features/this-week/this-week.component';
import { AddRecipeComponent } from './features/add-recipe/add-recipe.component';

const routes: Routes = [
  { path: 'recipes',
    component: RecipesDashboardComponent
  },
  { path: 'grocery-list',
    component: GroceryListComponent
  },
  { path: 'sidebar',
    component: SidebarComponent
  },
  { path: 'menu',
    component: MenuComponent
  },
  { path: 'add-recipe',
    component: AddRecipeComponent
  },
  { path: '',
    redirectTo: 'recipes',
    pathMatch: 'full'
  },
]

@NgModule({
  imports: [ RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled'
  })],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
