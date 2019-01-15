import { Injectable } from '@angular/core';
import { Recipe } from './recipe';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError, Subject, Observable } from 'rxjs';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
    recipeInfoSource = new Subject<object>();
    Recipes$ = this.recipeInfoSource.asObservable();
    showRecipeInstructionsSource = new Subject<boolean>();
    ShowRecipeInstructions$ = this.showRecipeInstructionsSource.asObservable();
    recipesURL = 'http://localhost:3000/recipes';
    httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        })
      };
    constructor( 
        private http: HttpClient,
        private messageService: MessageService
         ) { }

    hideRecipeInstructions(): void {
        this.showRecipeInstructionsSource.next(false);
      }

    showRecipeInstructions(): void {
        this.showRecipeInstructionsSource.next(true);
    }  
    
    getMostPopularRecipes(): void {
        this.http
            .get(`${this.recipesURL}?_sort=count&_order=desc`)
            .subscribe(
                (res: Recipe[]) => {
                    this.recipeInfoSource.next(res);
                }
            ),
            error => {
                this.recipeInfoSource.next();
                this.displayToastMessage('error', 'Recipes Not Retrieved', 'Recipes could not be retrieved from your recipe box.')
            }
    }

    getLeastPopularRecipes(): void {
        this.http
            .get(`${this.recipesURL}?_sort=count&_order=asc`)
            .subscribe(
                (res: Recipe[]) => {
                    this.recipeInfoSource.next(res);
                }
            ),
            error => {
                this.recipeInfoSource.next();
                this.displayToastMessage('error', 'Recipes Not Retrieved', 'Recipes could not be retrieved from your recipe box.')
            }
    }

    getSortedRecipes(): void {
        this.http
            .get(`${this.recipesURL}?_sort=title&_order=asc`)
            .subscribe(
                (res: Recipe[]) => {
                    this.recipeInfoSource.next(res);
                }
            ),
            error => {
                this.recipeInfoSource.next();
                this.displayToastMessage('error', 'Recipes Not Retrieved', 'Recipes could not be retrieved from your recipe box.')
            }
    }

    addNewRecipeFromScratch(recipe: Recipe): Observable<Recipe> {
        return this.http.post<Recipe>(this.recipesURL, recipe, this.httpOptions);
    }
      
    displayToastMessage(type, message, details) {
        this.messageService.add({severity: type, summary: message, detail: details});
    }
}
