import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipe-book',
  templateUrl: './recipe-book.component.html',
  styleUrls: ['./recipe-book.component.less']
})
export class RecipeBookComponent implements OnInit{

  selectedRecipe! :Recipe
  
  constructor(private resService:RecipeService){}

  ngOnInit(): void {
    this.resService.recipeSelected.subscribe((recipe:Recipe)=>{
      this.selectedRecipe = recipe
    })
  }
  
  
}
