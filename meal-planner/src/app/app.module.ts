import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { AppComponent } from './app.component';
import { SidebarComponent } from './features/sidebar/sidebar.component';
import { RecipesComponent } from './features/recipes/recipes.component';
import { GroceryListComponent } from './features/grocery-list/grocery-list.component';
import { RecipesModalComponent } from './features/recipes-modal/recipes-modal.component';
import { RecipesDashboardComponent } from './features/recipes/recipes-dashboard/recipes-dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './features/header/header.component';
import { CardModule } from 'primeng/card';
import { RouterModule, Routes } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenuComponent } from './features/this-week/this-week.component';
import { AddRecipeComponent } from './features/add-recipe/add-recipe.component';
import { ToastComponent } from './features/toast/toast.component';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    RecipesComponent,
    GroceryListComponent,
    RecipesModalComponent,
    RecipesDashboardComponent,
    HeaderComponent,
    MenuComponent,
    AddRecipeComponent,
    ToastComponent,
  ],
  imports: [
    BrowserModule,
    SidebarModule,
    BrowserAnimationsModule,
    CardModule,
    RouterModule,
    ButtonModule,
    DialogModule,
    ScrollPanelModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
