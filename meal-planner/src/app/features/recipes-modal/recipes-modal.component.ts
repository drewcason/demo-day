import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipes-modal',
  templateUrl: './recipes-modal.component.html',
  styleUrls: ['./recipes-modal.component.scss']
})
export class RecipesModalComponent implements OnInit {
display: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  showModal() {
    this.display = true;
  }
}
