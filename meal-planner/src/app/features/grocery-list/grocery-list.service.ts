import { Injectable } from '@angular/core';
import { Recipe } from '../../recipe';
import { Subject, Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GroceryListService {
  grocerySource = new Subject();
  GroceryList$ = this.grocerySource.asObservable();
  groceryURL = 'http://localhost:3000/grocery_list';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };
  constructor( private http: HttpClient ) { }

  getGroceryList(): any {
    this.http
      .get(`${this.groceryURL}?_sort=ingredient&_order=asc`)
      .subscribe(
        (res) => {
          this.grocerySource.next(res);
        }
      )
  }

  postItemsToGroceryList(grocery_item: object): Observable<string> {
    return this.http.post<string>(this.groceryURL, grocery_item, this.httpOptions)
  }

  removeItemFromGroceryList(id) {
    return this.http.delete(`${this.groceryURL}/${id}`, this.httpOptions)
  }

}
