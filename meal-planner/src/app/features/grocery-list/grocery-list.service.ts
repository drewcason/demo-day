import { Injectable } from '@angular/core';
import { Recipe } from '../../recipe';
import { Subject, Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { MessageService } from 'primeng/api';

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
  constructor( 
    private http: HttpClient,
    private messageService: MessageService ) { }

  getGroceryList(): any {
    this.http
      .get(`${this.groceryURL}?_sort=ingredient&_order=asc`)
      .subscribe(
        (res) => {
          this.grocerySource.next(res);
        },
        error => {
          this.displayToastMessage(
            'error',
            'Error',
            'Grocery list could not be retrieved.'
          )
        }
      )
  }

  postItemsToGroceryList(grocery_item: object): void {
    this.http.post<string>(this.groceryURL, grocery_item, this.httpOptions)
      .subscribe((res) => {},
      error => {
        this.displayToastMessage(
          'error',
          'Error',
          'Item were not added to grocery list.'
        )
      }
      );
  }

  removeItemFromGroceryList(id) {
    return this.http.delete(`${this.groceryURL}/${id}`, this.httpOptions)
  }

  displayToastMessage(type, message, details) {
    this.messageService.add({severity: type, summary: message, detail: details});
  }

}
