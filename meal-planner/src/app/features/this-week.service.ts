import { Injectable } from '@angular/core';
import { Recipe } from '../recipe';
import { Subject, Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class MenuService {
  menuSource = new Subject<Recipe[]>();
  Menu$ = this.menuSource.asObservable();
  menuURL = 'http://localhost:3000/menu';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };
  constructor( private http: HttpClient ) { }

  getThisWeeksRecipes(): any {
    this.http
      .get(this.menuURL)
      .subscribe(
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