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
          this.displayToastMessage('error', 'Menu Not Retrieved', 'This week\'s menu could not be retrieved.')
      }
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

  displayToastMessage(type, message, details) {
    this.messageService.add({severity: type, summary: message, detail: details});
  }

  private handleError(error: HttpErrorResponse, message) {
    if (error.error instanceof ErrorEvent) {
      this.displayToastMessage('error', message, error.error.message);
    } else {
      this.displayToastMessage('error', error.status, error.error);
    }
  };
  
}