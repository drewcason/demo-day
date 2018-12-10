import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from 'src/app/recipe';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit {
  showRecipeInstructions: boolean = true;
  
  @Input() recipe: Recipe;
  constructor() { }

  ngOnInit() {
  }

  toggleRecipeInstructions(): void {
    this.showRecipeInstructions = !this.showRecipeInstructions;
  }
  
}
