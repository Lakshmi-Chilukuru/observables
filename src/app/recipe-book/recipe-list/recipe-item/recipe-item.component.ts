import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../../recipe.model';


@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.less'],
})
export class RecipeItemComponent {
  @Input()  recipe!: Recipe;
 @Output() sendRecipe =new EventEmitter<any>();
 @Input() index:any;
 public items : any=[
  {
    name:'tomato',
    date:new Date(13,2,2001),
    quantity:34,
    purchase:"Yes"
  },
  {
    name:'carrot',
    date:new Date(13,2,2001),
    quantity:24,
    purchase:"Yes"
  },
  {
    name:'brinjal',
    date:new Date(13,2,2001),
    quantity:16,
    purchase:"No"

  },
  {
    name:'apple',
    date:new Date(13,2,2001),
    quantity:21,
    purchase:"Yes"
  },
  {
    name:'beet root',
    date:new Date(13,2,2001),
    quantity:61,
    purchase:"No"
  }

 ]
 public filteritems:any;
  
   addItem(){
    this.items.push({
      name:'beet root',
      date:new Date(13,2,2001),
      quantity:61,
      purchase:"Yes"
    })
   }
  //  emitRecipeItem(){
  //   this.reService.recipeSelected.emit(this.recipe)
  //  }
  
}
