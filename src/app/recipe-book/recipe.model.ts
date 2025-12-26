import { Ingredient } from "../shopping-list/shopping-list.model";

export class Recipe{
    public name:string;
    public description:string;
    public imagePath:string;
    public ingredients:Ingredient[]
    constructor(name:string,description:string,imagePath:string,ingredients:Ingredient[] ){
        this.name = name;
        this.description = description;
        this.imagePath = imagePath;
        this.ingredients = ingredients
    }
}

export interface UserInterface{
    id:string,
    name:string,
    age:number
}