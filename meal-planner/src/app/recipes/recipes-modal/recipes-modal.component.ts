import { Component, Input } from '@angular/core';
import { Recipe } from '../recipe';

@Component({
  selector: 'app-recipes-modal',
  templateUrl: './recipes-modal.component.html',
  styleUrls: ['./recipes-modal.component.scss']
})
export class RecipesModalComponent {
display = false;
@Input() recipe: Recipe;

  toggleModal(state: boolean) {
    this.display = state;
  }
}
