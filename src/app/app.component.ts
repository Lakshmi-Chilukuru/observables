import { Component, OnInit } from '@angular/core';
import { employeeType } from './employee';
import { RootService } from './root.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit{
  public empData:any =[];
  public selectedFeature:string='shoppinglist';
  constructor(private rS:RootService){}

  title = 'observables';
  ngOnInit(): void {
    // this.getEmpData();
  }

 
  
}
