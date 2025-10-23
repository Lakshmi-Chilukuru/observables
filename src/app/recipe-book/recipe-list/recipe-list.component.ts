import { Component, EventEmitter, HostListener, OnDestroy, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Subscription, timer } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DataStorageService } from 'src/app/shared/data-storage.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.less'],

})
export class RecipeListComponent implements OnInit,OnDestroy{
  public recipes! :Recipe[] ;
  public getRecipes:any;
  subscription!: Subscription;
  eventValue: any;
  counter: number =0;
  flag: boolean = true;
  cards:any[] =[]
  randCards: any;
  notifications: any[]=[];
  upNotify: any[]=[];
  nNotify: any[]=[];
  currentPage: number =0;
  NotSize: number =50;
  stockData: any[] =[];
  months: any;
  sstrocks: any;

 
  constructor(private rS:RecipeService,private stService:DataStorageService,private router:Router,private AcRoute:ActivatedRoute,private http:HttpClient){
this.onscRoll(); 
  }
  ngOnInit(): void {  
    
   this.fetchRecipes()
 
    this.subscription =this.rS.recipeAdded.subscribe((data:Recipe[])=>{
      this.recipes =data;
    })
    this.recipes =this.rS.getRecipes()
    console.log(this.recipes)

    this.cards =[
      {
        que:"q1",
        "ans" :"ans1"
      },
      {
        que:"q2",
        "ans" :"ans2"
      },
      {
        que:"q3",
        "ans" :"ans3"
      },
      {
        que:"q4",
        "ans" :"ans4"
      },
      {
        que:"q5",
        "ans" :"ans5"
      }

    ]
    this.randCards = this.cards;
    this.notifications = Array.from({ length: 50 }).map((i,k) => ({
    id: k + 1,
    message: `Notification #${k + 1}`
  }));
  console.log(this.notifications)
  this.nNotify = this.notifications
  this.upNotify =this.notifications.splice(0,50)
  
  this.months =['Jan','Feb','Mar','Apr','May','June','July','Aug','Sept','Oct','Nov','Dec']

  // this.stockData = Array.from({length:100}).map((_,i)=>(
    
  //   {
  //   let monthFor =Math.floor(Math.random()*10),
  //   const dayFor = Math.ceil(Math.floor(Math.random()*62)/2),
  //   let date= `${dayFor}-${this.months[monthFor]}-2000`
  //   ldate: date,
  //   id: i+1
  // }));

  for(let i=0;i<100;i++){
    let monthFor =Math.floor(Math.random()*10);
    const dayFor = Math.floor(Math.floor(Math.random()*62)/2);
    // let day;
    // if(dayFor==0){
    //   day=Math.floor(Math.floor(Math.random()*62)/2);
    // }else{
    //   day =dayFor
    // }
    const day = dayFor!=0?dayFor:Math.floor(Math.floor(Math.random()*62)/2);
    let date= `${day}-${this.months[monthFor]}-2000`
    let obj:any={}
    obj.ldate =date;
    obj.id =i+1;
    this.stockData.push(obj);
    
  }
  console.log(this.stockData)
  this.sstrocks = this.stockData
  
  
  // console.log(this.months[monthFor])
  
  
  }

  @HostListener('scroll', ['$event'])
  onScroll(event: any) {
    const element = event.target;
    if (element.scrollHeight - element.scrollTop === element.clientHeight) {
      this.onscRoll();
    }
  }
  onscRoll(){
    for (let i = 1; i <= 20; i++) {
      this.upNotify.push(`Item ${(this.currentPage-1)*20 + i}`);
    }
    this.currentPage++;
  }

   
  private fetchRecipes(){
    this.stService.fetchData();
  }
  shuffle(){
    for(let i=this.randCards.length-1;i>0;i--){
      let a = Math.floor(Math.random()*(i+1));
      [this.randCards[i],this.cards[a]]=[this.cards[a],this.cards[i]]
    }
    return this.randCards;
  }
  loadMore(){
    this.currentPage=0;
    this.NotSize=50;
    console.log(this.currentPage)
    const start =this.currentPage*this.NotSize;
    const end = start +this.NotSize;
    if(this.nNotify.length>0){
    this.upNotify =[...this.nNotify.splice(start,end)];
    }
    this.currentPage++;
  }
  goPrevious(){
    if(this.currentPage>0){
      
      const start=this.currentPage*this.NotSize;
      const end = start +this.NotSize;
      this.upNotify =this.nNotify.slice(start,end);
      this.currentPage--;
    }
    
    // this.currentPage--;
  }

  getMonth(e:any){
    console.log(e.target.value)
    let stocks = e.target.value;
    this.sstrocks = this.stockData
    this.sstrocks = this.sstrocks.filter((s:any)=>{
      return s.ldate.includes(stocks)
    })
    console.log(this.sstrocks)
  }
  trackById(index:number,item:any){
    return item.id
  }
  
  newRecipe(){
    this.router.navigate(['new'] ,{relativeTo :this.AcRoute})
  }

  inputChange(event:any){

    this.thrtWrap(event)
    // let flag =true
    // if(true){
    //   this.debounce(event)
    //   flag =false
    //   setTimeout(()=>{
    //   flag = true
    // },5000)
    // }
    
    
  }
  thrtWrap(e:any){
    // if(this.flag){
    //   this.debounce(e)
    //   this.flag= false;
    //   setTimeout(()=>{
    //     this.flag = true
    //   },2000)
    // }
    let timer;
    clearTimeout(timer)
    timer = setTimeout(()=>{
    this.debounce(e)
    },1000)
  }
  debounce(event:any){
    let eventValue = this.counter++;
    // console.log("counter " + eventValue )
    console.log(event.target.value);
  }

  

  ngOnDestroy(): void {
    (this.subscription.unsubscribe())
  }

  
}
