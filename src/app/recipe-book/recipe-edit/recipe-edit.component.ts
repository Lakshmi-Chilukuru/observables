import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';
import { Observable } from 'rxjs';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ShoppingService } from 'src/app/shopping-list/shopping.service';
import { Ingredient } from 'src/app/shopping-list/shopping-list.model';
import {HttpClient} from '@angular/common/http'
import { DataStorageService } from 'src/app/shared/data-storage.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.less'],
})
export class RecipeEditComponent implements OnInit {
  id!: number;
  recipe!: Recipe;
  editMode: boolean = false;
  recipeForm!: FormGroup;
  shopList!: Ingredient;
  constructor(
    private Routers: ActivatedRoute,
    private route: Router,
    private resService: RecipeService,
    private fb: FormBuilder,
    private ingService: ShoppingService,
    private http:HttpClient,
    private dataService:DataStorageService
  ) {
    if (this.editMode) {
      this.resService.getRecipe(this.id);
    }
  }

  ngOnInit(): void {
    this.Routers.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
      // this.recipe =t his.resService.getRecipe(this.id)
    });
  }
  private initForm() {
    let recipeName = '';
    let recipePath = '';
    let recipeDescription = '';
    let recipeIngredients: any = new FormArray([]);

    if (this.editMode) {
      this.recipe = this.resService.getRecipe(this.id);
     
      recipeName = this.recipe.name;
      recipePath = this.recipe.imagePath;
      recipeDescription = this.recipe.description;
      if (this.recipe['ingredients']) {
        for (let ingredient of this.recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount, Validators.required),
            })
          );
        }
      }
      // shopItem = this.shopList.name;
      // itemCost = this.shopList.amount;
    }
    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName,Validators.required),
      imagePath: new FormControl(recipePath, Validators.required),
      description: new FormControl(recipeDescription, Validators.required),
      ingredients: recipeIngredients,
    });
    // this.recipeForm = this.fb.group({
    //   rName: [recipeName],
    //   imagePath: [recipePath],
    //   recipeDesc: [recipeDescription],
    // });
  }
  get ingredientsControls() {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }
  onSubmit() {
  const newRecipe=new Recipe(this.recipeForm.value.name,this.recipeForm.value.description,this.recipeForm.value.imagePath,this.recipeForm.value.ingredients)
    // this.resService.onAddItem(this.recipeForm.value)
    // this.recipeForm.reset()
    // this.route.navigate(['recipes'])
    if(this.editMode){
      this.resService.updateItem(this.id,newRecipe)
    }
    else{
      this.resService.onAddItem([newRecipe]);
      this.http.post('https://shopitem-bcc1b-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json',[newRecipe]).subscribe((res)=>{
       
      })
    }
    
    this.dataService.storeRecipes()
    this.clearForm()
  }
  
  clearForm(){
    this.route.navigate(['../'], {relativeTo:this.Routers})
  }

  addIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(Validators.required),
        'amount':new FormControl(Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/))
      })
    )

  }
  closeIngredient(index:number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index)
  }

 
}
