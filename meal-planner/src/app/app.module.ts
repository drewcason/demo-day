import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RecipesComponent } from './recipes/recipes.component';
import { GroceryListComponent } from './grocery-list/grocery-list.component';
import { RecipesModalComponent } from './recipes/recipes-modal/recipes-modal.component';
import { RecipesDashboardComponent } from './recipes/recipes-dashboard/recipes-dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { CardModule } from 'primeng/card';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenuComponent } from './this-week/this-week.component';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { ToastComponent } from './toast/toast.component';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { SelectButtonModule } from 'primeng/selectbutton';
import { RadioButtonModule } from 'primeng/radiobutton';

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
    ToastModule,
    SelectButtonModule,
    RadioButtonModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
