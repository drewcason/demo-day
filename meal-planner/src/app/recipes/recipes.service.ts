import { Injectable } from '@angular/core';
import { Recipe } from './recipe';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
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

    toggleRecipeInstructions(show: boolean): void {
        this.showRecipeInstructionsSource.next(show);
    }

    getMostPopularRecipes(): void {
        this.http.get(`${this.recipesURL}?_sort=count&_order=desc`)
            .subscribe(
                (res: Recipe[]) => {
                    this.recipeInfoSource.next(res);
                },
            error => {
                this.handleHTTPFailure();
            });
    }

    getLeastPopularRecipes(): void {
        this.http.get(`${this.recipesURL}?_sort=count&_order=asc`)
            .subscribe(
                (res: Recipe[]) => {
                    this.recipeInfoSource.next(res);
                },
            error => {
                this.handleHTTPFailure();
            });
    }

    getSortedRecipes(): void {
        this.http.get(`${this.recipesURL}?_sort=title&_order=asc`)
            .subscribe(
                (res: Recipe[]) => {
                    this.recipeInfoSource.next(res);
                },
            error => {
                this.handleHTTPFailure();
            });
    }

    addNewRecipeFromScratch(recipe: Recipe): void {
        this.http.post(this.recipesURL, recipe, this.httpOptions)
            .subscribe((response) => {
                this.displayToastMessage(
                    'success',
                    'Success',
                    'Your new recipe was added to the recipe box.'
                );
            },
            error => {
                this.displayToastMessage(
                    'error',
                    'Error',
                    'Your recipe was not added to the recipe box.'
                );
            });
    }

    displayToastMessage(type, message, details) {
        this.messageService.add({severity: type, summary: message, detail: details});
    }

    handleHTTPFailure(): void {
        this.recipeInfoSource.next();
        this.displayToastMessage(
            'error',
            'Recipes Not Retrieved',
            'Recipes could not be retrieved from your recipe box.'
        );
    }
}
