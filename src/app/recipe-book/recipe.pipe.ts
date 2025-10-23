import { PipeTransform ,Pipe} from "@angular/core";

@Pipe({
    name:'descShort',
    pure:false
})

export class RecipeDesc implements PipeTransform{
    transform(value:any,limit:number){
        if(value.length>limit){
            return value.substr(0,limit)+ '....'
        }
        else{
            return value        
        }
        
    }
} 