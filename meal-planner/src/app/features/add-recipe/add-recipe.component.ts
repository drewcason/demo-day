import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Recipe } from '../../recipe';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.scss']
})
export class AddRecipeComponent implements OnInit {
  addRecipeForm: FormGroup;
  title: string;
  prep_time: string;
  cook_time: string;
  protein: string;
  season: string;
  ethnicity: string;
  newRecipe: Recipe;

  constructor(

  ) { }

  ngOnInit() {
    this.setForm();
    this.setRecipeCardInfo();
  }

  setRecipeCardInfo(): void {
    this.addRecipeForm.valueChanges.subscribe((form) => {
      this.title = form.title;
      this.cook_time = form.cook_time;
      this.prep_time = form.prep_time;
    });
  }

  setForm () {
    this.addRecipeForm = new FormGroup({
      title: new FormControl('',[Validators.required]),
      grocery_items: new FormGroup({
        ingredient: new FormControl('',[Validators.required]),
        amount: new FormControl('',[Validators.required])
      }),
      protein: new FormControl('',[Validators.required]),
      season: new FormControl('',[Validators.required]),
      ethnicity: new FormControl('',[Validators.required]),
      servings: new FormControl('',[Validators.required]),
      cook_time: new FormControl('',[Validators.required]),
      prep_time: new FormControl('',[Validators.required]),
      directions: new FormControl('',[Validators.required])
    })
  }

}
