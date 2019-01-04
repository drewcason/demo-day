import { Injectable } from '@angular/core';
import { Recipe } from '../recipe';
import { Subject, Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

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
  constructor( private http: HttpClient ) { }

  getThisWeeksRecipes(): any {
    this.http.get(this.menuURL).subscribe(
        (res: Recipe[]) => {
          this.menuSource.next(res);
        }
      )
  }

  postThisWeeksRecipes(recipe: Recipe): Observable<Recipe> {
    return this.http.post<Recipe>(this.menuURL, recipe, this.httpOptions)
  }

  removeRecipeFromMenu(id) {
    return this.http.delete(`${this.menuURL}/${id}`, this.httpOptions)
  }

  updateRecipeCount(id, count) {
    return this.http.patch(`${this.recipeURL}/${id}`, { "count": count }, this.httpOptions);
  }

  madeRecipeAndRemoveFromMenu(id, count) {
    this.updateRecipeCount(id, count);
    this.removeRecipeFromMenu(id);
  }
  // private handleError(error: HttpErrorResponse) {
  //   if (error.error instanceof ErrorEvent) {
  //     console.error('An error occurred:', error.error.message);
  //   } else {
  //     console.error(
  //       `Backend returned code ${error.status}, ` +
  //       `body was: ${error.error}`);
  //   }
  //   return throwError(
  //     'Something bad happened; please try again later.');
  // };
}