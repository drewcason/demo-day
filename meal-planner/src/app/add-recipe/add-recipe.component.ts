import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormArray} from '@angular/forms';
import { Recipe } from '../recipes/recipe';
import { SelectItem, MessageService } from 'primeng/api';
import { RecipeService } from '../recipes/recipes.service';

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
  grocery_items: FormArray;
  directions: FormArray;
  groceries = [];
  instructions = [];
  formPages: SelectItem[];
  selectedFormPage: any;
  breakfast: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private recipeService: RecipeService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.setForm();
    this.setRecipeCardInfo();
    this.setFormPages();
    this.selectedFormPage = 'Basics';
  }

  setFormPages(): void {
    this.formPages = [
      { label: 'Basics', value: 'Basics'},
      { label: 'Ingredients', value: 'Ingredients'},
      { label: 'Instructions', value: 'Instructions'}
    ];
  }

  setRecipeCardInfo(): void {
    this.addRecipeForm.valueChanges.subscribe((form) => {
      this.title = form.title;
      this.cook_time = form.cook_time;
      this.prep_time = form.prep_time;
      this.groceries = form.grocery_items;
      this.instructions = form.directions;
      this.selectedFormPage = form.selectedPage;
    });
  }

  setForm () {
    this.addRecipeForm = this.formBuilder.group({
      title: ['', Validators.required],
      protein: ['', Validators.required],
      season: ['', Validators.required],
      ethnicity: ['', Validators.required],
      servings: ['', Validators.required],
      cook_time: ['', Validators.required],
      prep_time: ['', Validators.required],
      breakfast: ['', Validators.required],
      grocery_items: this.formBuilder.array([
        this.addGroceryItemField()
      ]),
      directions: this.formBuilder.array([
        this.addDirectionsStepField()
      ]),
      selectedPage: ['Basics']
    });
  }

  addItems() {
    this.grocery_items = this.addRecipeForm.get('grocery_items') as FormArray;
    this.grocery_items.push(this.addGroceryItemField());
  }

  addGroceryItemField(): FormGroup {
    return this.formBuilder.group({
      amount: '',
      ingredient: ''
    });
  }

  removeItem(index: number) {
    this.grocery_items.removeAt(index);
  }

  addSteps() {
    this.directions = this.addRecipeForm.get('directions') as FormArray;
    this.directions.push(this.addDirectionsStepField());
  }

  addDirectionsStepField(): FormGroup {
    return this.formBuilder.group({
      step: ''
    });
  }

  removeStep(index) {
    this.directions.removeAt(index);
  }

  onSubmit() {
    this.newRecipe = this.addRecipeForm.value;
    this.newRecipe['isAddedToMenu'] = false;
    this.newRecipe['count'] = 0;
    this.newRecipe['image'] = '/assets/images/default.png';
    delete this.newRecipe.selectedPage;
    this.recipeService.addNewRecipeFromScratch(this.newRecipe);
    this.addRecipeForm.reset();
  }

  showConfirm() {
    this.messageService.clear();
    this.messageService.add({key: 'c', sticky: true, severity: 'info', summary: 'Are you sure?', detail: 'Confirm to proceed'});
  }

  onConfirm() {
    this.recipeService.addNewRecipeFromScratch(this.newRecipe);
    this.messageService.clear('c');
    this.addRecipeForm.reset();
  }

  onReject() {
    this.messageService.clear('c');
  }

  clear() {
    this.messageService.clear();
  }
}

