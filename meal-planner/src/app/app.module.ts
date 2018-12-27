import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { AppComponent } from './app.component';
import { SidebarComponent } from './features/sidebar/sidebar.component';
import { SearchComponent } from './features/search/search.component';
import { RecipesComponent } from './features/recipes/recipes.component';
import { GroceryListComponent } from './features/grocery-list/grocery-list.component';
import { RecipesModalComponent } from './features/recipes-modal/recipes-modal.component';
import { RecipesDashboardComponent } from './features/recipes/recipes-dashboard/recipes-dashboard.component';
import { StepsComponent } from './features/steps/steps.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './features/header/header.component';
import { CardModule } from 'primeng/card';
import { RouterModule, Routes } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { StepsModule } from 'primeng/steps';
import { DialogModule } from 'primeng/dialog';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ThisWeekComponent } from './features/this-week/this-week.component';
import { AddRecipeModalComponent } from './features/add-recipe-modal/add-recipe-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    SearchComponent,
    RecipesComponent,
    GroceryListComponent,
    RecipesModalComponent,
    RecipesDashboardComponent,
    StepsComponent,
    HeaderComponent,
    ThisWeekComponent,
    AddRecipeModalComponent,
  ],
  imports: [
    BrowserModule,
    SidebarModule,
    BrowserAnimationsModule,
    CardModule,
    RouterModule,
    ButtonModule,
    StepsModule,
    DialogModule,
    ScrollPanelModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
