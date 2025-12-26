import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { employeeType, toDoReference } from './employee';
import { RootService } from './root.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent implements OnInit{
  public empData:any =[];
  public selectedFeature:string='shoppinglist';
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
  ngOnInit(): void {
    // this.getEmpData();
  }
  changeData(){
    this.todos[0] = {...this.todos[0] ,text : "foooo"}
  }

  fromAsync(){

  }

  

 
  
}
