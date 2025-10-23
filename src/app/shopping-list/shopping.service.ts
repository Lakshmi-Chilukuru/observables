import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "./shopping-list.model";


@Injectable({
    providedIn:"root"
})


export class ShoppingService {

    
    public itemsAdded = new Subject<Ingredient[]>()
    public editSelected = new Subject<any>()
    public counterValue = new Subject();
    public shoppinglist:Ingredient[] =[
        new Ingredient('Apple',50),
        new Ingredient('Mango',70)
    ]
    

    getIngredients(){
        return this.shoppinglist.slice();
    }

    getIngredient(index:number){
        // const  dumShopList = [...this.shoppinglist]
        // return dumShopList.splice(index,1)
        return this.shoppinglist[index]
    }

    addIngredient(ingredient :Ingredient[]){
       this.shoppinglist.push(...ingredient)
       this.itemsAdded.next(this.shoppinglist.slice())
    }

    updateIngredient(index:number,newingredient:Ingredient){
       this.shoppinglist[index] =newingredient;
       this.itemsAdded.next(this.shoppinglist.slice())
    }

    deleteIngredient(index:number){
       this.shoppinglist.splice(index,1)
       this.itemsAdded.next(this.shoppinglist.slice())
    }

    increment(value:number){
        value++;
        this.counterValue.next(value)
    }
    decrement(value:number){
        value--;
        this.counterValue.next(value)
    }
    
   

    // addShopIngredient(ingredient:Ingredient[]){
    //     this.
    // }
   
}