import { PipeTransform ,Pipe} from "@angular/core";

@Pipe({
    name:'filteredPipe',
    pure:false
})
export class FilterPipe implements PipeTransform{
    transform(value: any,filteredName :any,searchName:string ) {
        const newArray =[]
        if(value.length<0){
            return value
        }
        else{
            for(const item of value){
                if(item[searchName] == filteredName){
                newArray.push(item)
                }
            }
           return newArray
        }
    }
    
}