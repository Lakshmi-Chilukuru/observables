import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ComponentFactoryResolver, ComponentRef, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { toDoReference } from '../employee';
import { RootService } from '../root.service';
import { debounceTime, distinctUntilChanged, Observable, Subject, Subscription, switchMap,map, catchError, of, shareReplay } from 'rxjs';
import { CounterOutputComponent } from '../shopping-list/counter-output/counter-output.component';
import {ajax} from 'rxjs/ajax';
import { DataStorageService } from '../shared/data-storage.service';


@Component({
  selector: 'app-viewdetails',
  templateUrl: './viewdetails.component.html',
  styleUrls: ['./viewdetails.component.less'],
  changeDetection:ChangeDetectionStrategy.OnPush

})
export class ViewdetailsComponent implements OnInit {
  changeText!:string;
  asyncData$!:Observable<string>; 
  checkText!:string
  @ViewChild('dynamo',{read: ViewContainerRef,static:true})dynamo!:ViewContainerRef;
  timer: any;
  searchField!:string;
  public subs!:Subscription
  public takeValue$ = new Subject<string>();
  public obSub$ = new Subject();
  public data$ !:Observable<any>;
  

  constructor(private rS:RootService,private cd:ChangeDetectorRef ,private facTtory :ComponentFactoryResolver,private ds:DataStorageService){
    this.asyncData$ = this.rS.text$;
    //  this.ds.getUsers().subscribe((val)=>{
    //   console.log(val)
    // })
    // console.log(this.data$)
    this.rS.getApi();
  }

  ngOnInit(){
    this.changeText = "ergerger";
  
    
    // let s1 = api.subscribe(va=>console.log("S1",va));
    // let s2 = api.subscribe(va=>console.log("S2",va))

      // this.obSub$.subscribe(v=>console.log("o1susb",v));
      // this.obSub$.subscribe(v=>console.log("o2susb",v));
    
//       let ap12 = ajax('https://jsonplaceholder.typicode.com/users').pipe(shareReplay({
//           bufferSize: 1,
//           refCount: true
//         }),catchError(err=>{
//         console.log(err.message);
//         return of("from catchError")
//   }
// ))
//     let susb = ap12.subscribe(this.obSub$)
  }
  componentCheck(){
    // console.log("checked")
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

  getValue(){
    this.takeValue$.next(this.searchField)
    this.subs = this.takeValue$.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((val:any)=>(val))
    ).subscribe((val:any)=>console.log(val));
  }

  getValu(){
    clearTimeout(this.timer)
    this.timer = setTimeout(()=>{
      this.debounce()
    },1000)
  }
  

  debounce(){
    console.log(this.checkText)
  }

  addComp(){
    // this.dynamo.clear();
    // this.dynamo.createComponent(CounterOutputComponent);
    this.dynamo.clear();
    const factory = this.facTtory.resolveComponentFactory(CounterOutputComponent)
    this.dynamo.createComponent(factory);
  }
}
