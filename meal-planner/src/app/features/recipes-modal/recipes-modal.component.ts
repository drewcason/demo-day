import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from 'src/app/recipe';
import { InvokeFunctionExpr } from '@angular/compiler';

@Component({
  selector: 'app-recipes-modal',
  templateUrl: './recipes-modal.component.html',
  styleUrls: ['./recipes-modal.component.scss']
})
export class RecipesModalComponent implements OnInit {
display: boolean = false;
@Input() recipe: Recipe;
@Input() title: Recipe["title"];
@Input() image: Recipe["image"];
@Input() grocery_items: Recipe['grocery_items'];
@Input() directions: Recipe['directions'];
@Input() cook_time: Recipe['cook_time'];
@Input() prep_time: Recipe['prep_time'];


  constructor() { }

  ngOnInit() {
  }

  showModal() {
    this.display = true;
  }
}
