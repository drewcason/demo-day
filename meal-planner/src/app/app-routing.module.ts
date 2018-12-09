import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipesDashboardComponent } from './features/recipes/recipes-dashboard/recipes-dashboard.component';
import { RecipeCalendarComponent } from './features/calendar/calendar.component';
import { GroceryListComponent } from './features/grocery-list/grocery-list.component';
import { SidebarComponent } from './features/sidebar/sidebar.component';

const routes: Routes = [
  { path: 'recipes',
    component: RecipesDashboardComponent
  },
  { path: 'calendar',
    component: RecipeCalendarComponent
  },
  { path: 'grocery-list',
    component: GroceryListComponent
  },
  { path: 'sidebar',
    component: SidebarComponent
  },
  { path: '',
    redirectTo: 'recipes',
    pathMatch: 'full'
  },
]

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
