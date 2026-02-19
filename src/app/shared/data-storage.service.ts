import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RecipeService } from "../recipe-book/recipe.service";
import { Recipe } from "../recipe-book/recipe.model";
import { map, Observable, shareReplay } from "rxjs";

@Injectable({providedIn:'root'})

export class DataStorageService{

    public recipe:Recipe[] =[]
    private users$: any;
    constructor(private http:HttpClient,private reService:RecipeService){}

    getRecipes(){
        const recipes =this.reService.getRecipes()
    }
    storeRecipes(){
        const recipes = this.reService.getRecipes()
        return this.http.put('https://shopitem-bcc1b-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json',recipes)
        .pipe(map((res)=>Object.values(res).flat()),shareReplay({
          bufferSize: 1,
          refCount: true
        }))
    }
    fetchData(){
        return this.http.get<Recipe[]>('https://shopitem-bcc1b-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json').subscribe((recipes)=>{
this.reService.setRecipes(recipes)
        })
    }
    getUsers(): Observable<any> {
    if (!this.users$) {
      this.users$ = this.http
        .get<any>('https://jsonplaceholder.typicode.com/users')
        .pipe(
          shareReplay({
            bufferSize: 1,
            refCount: true
          })
        );
    }
    return this.users$;
  }
}