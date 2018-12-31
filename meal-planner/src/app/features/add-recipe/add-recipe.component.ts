import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl} from '@angular/forms';

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
  constructor(

  ) { }

  ngOnInit() {
    this.setForm();
  }

  setForm () {
    this.addRecipeForm = new FormGroup({
      title: new FormControl(),
      grocery_items: new FormGroup({
        ingredient: new FormControl(),
        amount: new FormControl()
      }),
      protein: new FormControl(),
      season: new FormControl(),
      ethnicity: new FormControl(),
      servings: new FormControl(),
      cook_time: new FormControl(),
      prep_time: new FormControl(),
      directions: new FormControl()
    })

  }
}
