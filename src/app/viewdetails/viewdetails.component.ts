import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { toDoReference } from '../employee';
import { RootService } from '../root.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-viewdetails',
  templateUrl: './viewdetails.component.html',
  styleUrls: ['./viewdetails.component.less'],
  changeDetection:ChangeDetectionStrategy.OnPush

})
export class ViewdetailsComponent implements OnInit {
  @Input() toDo!:toDoReference
  changeText ="I am not changed"
  asyncData$!:Observable<string>; 
  constructor(private rS:RootService,private cd:ChangeDetectorRef){
    this.asyncData$ = this.rS.text$
  }

  ngOnInit(){

  }
  componentCheck(){
    console.log("checked")
    return true
  }
  changeTexti(){
    this.changeText ="textChanged"
  }

  fromAsync(){
    this.rS.text$.next("Lakshmi");
    this.cd.detach()
  }
  reAtach(){
    this.cd.reattach()
  }
}
