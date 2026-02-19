import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from './shopping-list.model';
import { ShoppingService } from './shopping.service';
import { BehaviorSubject, map, Observable, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ICount } from './Store/data';
import { select, Store } from '@ngrx/store';
import { add, minus } from './Store/count.action';


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
  public amount = 500000;
  public count:number =0;
  public sharedCount$ :BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public counter$: Observable<number>;
  constructor(private ingService:ShoppingService,private http:HttpClient,private store:Store<ICount>){
    this.counter$ = this.store.pipe(select('count'))
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

  add(){
    // this.ingService.incRxjsValue();
    this.store.dispatch(add())
  }

  minus(){
    // this.ingService.decRxjsValue();
    this.store.dispatch(minus())
  }
  ngOnDestroy(): void {
    this.subData.unsubscribe()
  }
  
}
