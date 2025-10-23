import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from './shopping-list.model';
import { ShoppingService } from './shopping.service';
import { map, Observable, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.less'],
})
export class ShoppingListComponent implements OnInit,OnDestroy {
  public ingredients:Ingredient[] = []
  public subData!:Subscription;
  public index! :Subscription
  recipes: any;

  public counter$: Observable<number>;
  constructor(private ingService:ShoppingService,private http:HttpClient,private store:Store<{counter:number}>){
    this.counter$ = this.store.select('counter')
  }
  ngOnInit(): void {
    this.ingredients =this.ingService.getIngredients()
    if(this.ingService.itemsAdded){
      this.subData=this.ingService.itemsAdded.subscribe((data:Ingredient[])=>{
        this.ingredients= data
        })
    }else{
      this.ingredients =this.ingService.getIngredients()
    }   
    console.log(this.ingredients)
    
  }
 
  onEditItem(i:number){
  this.ingService.editSelected.next(i)
  
  }
  getShopDetails(ingre:Ingredient){
    this.ingredients.push(ingre)
  }
  ngOnDestroy(): void {
    this.subData.unsubscribe()
  }
  
}
