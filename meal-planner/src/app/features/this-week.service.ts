import { Injectable } from '@angular/core';
import { Recipe } from '../recipe';
import { Subject, Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class MenuService {
  menuSource = new Subject<Recipe[]>();
  Menu$ = this.menuSource.asObservable();
  menuURL = 'http://localhost:3000/menu';
  recipeURL = 'http://localhost:3000/recipes';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };
  count: number;
  constructor( 
    private http: HttpClient,
    private messageService: MessageService ) { }

  getThisWeeksRecipes(): any {
    this.http.get(this.menuURL).subscribe(
        (res: Recipe[]) => {
          this.menuSource.next(res);
        }
      ),
      error => {
          this.menuSource.next();
          this.displayToastMessage(
            'error',
            'Menu Not Retrieved',
            'This week\'s menu could not be retrieved.'
            )
      }
  }

  postThisWeeksRecipes(recipe: Recipe): void {
    this.http.post<Recipe>(this.menuURL, recipe, this.httpOptions)
      .subscribe((response) => {
        this.displayToastMessage(
          'success',
          'Success',
          `${response.title} was added to your menu.`
        )
      },
        error => {
          this.displayToastMessage(
            'error',
            'Error',
            'Recipe was not added to menu.'
          )
        })
  }

  removeRecipeFromMenu(id) {
    return this.http.delete(`${this.menuURL}/${id}`, this.httpOptions);
  }

  updateRecipeCount(id, count) {
    return this.http.patch(`${this.recipeURL}/${id}`, { "count": count }, this.httpOptions);
  }

  updateRecipeAddedToMenu(id) {
    return this.http.patch(`${this.recipeURL}/${id}`, { "isAddedToMenu": true }, this.httpOptions);
  }

  updateRecipeRemovedFromMenu(id) {
    return this.http.patch(`${this.recipeURL}/${id}`, { "isAddedToMenu": false }, this.httpOptions);
  }

  displayToastMessage(type, message, details) {
    this.messageService.add({severity: type, summary: message, detail: details});
  }
}
