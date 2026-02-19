import { EventEmitter, Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { Ingredient } from "./shopping-list.model";
import { HttpClient } from "@angular/common/http";


@Injectable({
    providedIn:"root"
})



export class ShoppingService {
    private countValue = new BehaviorSubject<number>(0);
    public ccOunt = this.countValue.asObservable();
    
    public itemsAdded = new Subject<Ingredient[]>()
    public editSelected = new Subject<any>()
    public counterValue = new Subject();
    public shoppinglist:Ingredient[] =[
        new Ingredient('Apple',50),
        new Ingredient('Mango',70)
    ]
    constructor(private http:HttpClient){}
    incRxjsValue(){
        this.countValue.next(this.countValue.value+1);
    }

    decRxjsValue(){
        this.countValue.next(this.countValue.value-1);

    }
    

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

    getDepData(){
        return this.http.get('https://api.freeprojectapi.com/api/EmployeeApp/GetDepartments');
    }
    
   

    // addShopIngredient(ingredient:Ingredient[]){
    //     this.
    // }
   
}