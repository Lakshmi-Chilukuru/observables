import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shopping-list/shopping-list.model';
import { ShoppingService } from '../shopping-list/shopping.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();
  recipeAdded = new Subject<Recipe[]>();
  public recipes: Recipe[] = [
    new Recipe(
      'A Test Recipe',
      'Sample Recipe to cook',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTuQCSq3vuilBB1Mcl_j564l8yyODvi-Pjuw&s',
      [new Ingredient('Peas', 50), new Ingredient('Mango', 45)]
    ),
    new Recipe(
      'Ratatouille',
      'A Sweet Tasty Food',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCzGbx87i8TCsYsbiuPxv9Eios1qhpPTdVbg&s',
      [new Ingredient('Jam', 50), new Ingredient('Grapes', 45)]
    ),
  ];
  constructor(private sService: ShoppingService) {}

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipeAdded.next(this.recipes.slice());
  }
  getRecipes() {
    return this.recipes.slice();
  }
  getRecipe(index: number) {
    return this.recipes[index];
  }
  addRecIngrdient(ingredients: Ingredient[]) {
    this.sService.addIngredient(ingredients);
  }
  onAddItem(recipes: Recipe[]) {
    this.recipes.push(...recipes);
    this.recipeAdded.next(this.recipes.slice());
  }

  updateItem(index: number, updateRecipe: Recipe) {
    this.recipes[index] = updateRecipe;
    this.recipeAdded.next(this.recipes.slice());
  }
  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipeAdded.next(this.recipes.slice());
  }
}
