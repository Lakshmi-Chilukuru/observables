import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, TemplateRef, ViewChild,Output, OnDestroy } from '@angular/core';
import { map, Subscription } from 'rxjs';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit, OnDestroy {
  public caretValue:any
  caretTop:boolean =true ;
  caretBottom!:boolean;
  public fetchrecipeData:any;
  // public hideMenus: boolean =false;
  // @Output() featureName=new EventEmitter<string>();
  showMenu: any;
  public authenticated: boolean =false;
  public subscribeAuth!: Subscription;
  public logOuti:boolean = false

  constructor(private http:HttpClient,private stService:DataStorageService,private auth:AuthService){}
  ngOnInit(): void {
    // this.authe()
    
  }
  // manageCaret(){
  //   this.caretBottom= !this.caretBottom;
  //   this.caretTop= !this.caretTop;
  //   this.hideMenus = !this.hideMenus
  // }

  authe(){
    if(this.logOuti){
      this.authenticated = false
    }
    else{
      this.subscribeAuth =this.auth.user.subscribe(user=>{
        this.authenticated = true;
      })
    }
  
  }
  hideMenus(event:any){
    this.caretTop = event[1]
    this.caretBottom = event[2]
    this.showMenu = event[0]
  }

  // openFeature(feature:string){
  //   this.featureName.emit(feature)
  // }
  saveData(){
    this.stService.storeRecipes()
  }
  fetchData(){
    this.stService.fetchData();
  }
  logOut(){
    this.auth.logOut();
    
    this.logOuti = true;
    this.showMenu = false
    this.authe()
    
  }
  //   this.http.get('https://recipe-book-fc98e-default-rtdb.firebaseio.com/recipes.json').pipe(
  //     map((data:any)=>{
  //       const newData =[]
  //       for (let i in data){
  //         if(data.hasOwnProperty(i)){
  //           newData.push({...data[i], id:i})
  //         }
  //       }
  //       return newData;
  //     })
  //   ).subscribe(data=>{
  //     console.log(data)
  //     this.fetchrecipeData = data
  //   })
  // }

  ngOnDestroy(): void {
    this.subscribeAuth.unsubscribe();
  }
}
