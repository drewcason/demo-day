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

    constructor( private http: HttpClient) { }

    hideRecipeInstructions(): void {
        this.showRecipeInstructionsSource.next(false);
      }

    showRecipeInstructions(): void {
        this.showRecipeInstructionsSource.next(true);
    }  
    
    getRecipes(): void {
        this.http
            .get('assets/db.json')
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
