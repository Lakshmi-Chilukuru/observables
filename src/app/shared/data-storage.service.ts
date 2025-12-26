import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RecipeService } from "../recipe-book/recipe.service";
import { Recipe } from "../recipe-book/recipe.model";
import { map, Observable } from "rxjs";

@Injectable({providedIn:'root'})

export class DataStorageService{

    public recipe:Recipe[] =[]
    constructor(private http:HttpClient,private reService:RecipeService){}

    getRecipes(){
        const recipes =this.reService.getRecipes()
    }
    storeRecipes(){
        const recipes = this.reService.getRecipes()
        return this.http.put('https://shopitem-bcc1b-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json',recipes)
        .pipe(map((res)=>Object.values(res).flat()))
        .subscribe((response)=>{
           
        })
    }
    fetchData(){
        return this.http.get<Recipe[]>('https://shopitem-bcc1b-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json').subscribe((recipes)=>{
this.reService.setRecipes(recipes)
        })
    }
}