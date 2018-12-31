import { Injectable } from '@angular/core';
import { Recipe } from './recipe';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
    recipeInfoSource = new Subject<object>();
    Recipes$ = this.recipeInfoSource.asObservable();
    showRecipeInstructionsSource = new Subject<boolean>();
    ShowRecipeInstructions$ = this.showRecipeInstructionsSource.asObservable();
    showInstructions: boolean;
    recipesURL = 'http://localhost:3000/recipes';
    constructor( private http: HttpClient ) { }

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
            )
    }

    getLeastPopularRecipes(): void {
        this.http
            .get(`${this.recipesURL}?_sort=count&_order=asc`)
            .subscribe(
                (res: Recipe[]) => {
                    this.recipeInfoSource.next(res);
                }
            )
    }

    getSortedRecipes(): void {
        this.http
            .get(`${this.recipesURL}?_sort=title&_order=asc`)
            .subscribe(
                (res: Recipe[]) => {
                    this.recipeInfoSource.next(res);
                }
            )
    }

    private handleError(err: HttpErrorResponse) {
        let errorMessage = '';
        if (err.error instanceof ErrorEvent) {
            errorMessage = `An error occurred: ${err.error.message}`;
        } else {
            errorMessage = `Served returned code: ${err.status}, error message is: ${err.message}`;
        }
        console.log(errorMessage);
        return throwError(errorMessage);
    }

}
