import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-recipe-modal',
  templateUrl: './add-recipe-modal.component.html',
  styleUrls: ['./add-recipe-modal.component.css']
})
export class AddRecipeModalComponent implements OnInit {
  addRecipeForm: FormGroup;
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
