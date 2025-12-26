import {Component } from '@angular/core';
import {  toDoReference } from './employee';
import { RootService } from './root.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent{
  public empData:any =[];
  public selectedFeature='shoppinglist';
  public todos :toDoReference[] =[
    {
      name:"lakshmi",
      id:"4332",
      text : "First Task"
    },
    {
      name:"wegre",
      id:"66346",
      text :"Second Task"
    },
    {
      name:"lgregakshmi",
      id:"433etw2",
      text : "Third Task"
    }
  ]
  constructor(private rS:RootService){
  }

  title = 'observables';
 
  changeData(){
    this.todos[0] = {...this.todos[0] ,text : "foooo"}
  }



  

 
  
}
