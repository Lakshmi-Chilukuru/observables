import { Component, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ShoppingService } from 'src/app/shopping-list/shopping.service';
import { Ingredient } from 'src/app/shopping-list/shopping-list.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RecipeBookComponent } from '../recipe-book.component';
import { dnComponent } from './dn.component';

const ComponentComnfig =[
  {
    component :import('./dn.component').then(i=>i.dnComponent),
    inputs:{
      name:"Lakshmi"
    }
  },
  {
    component :import('./dn2.component').then(i=>i.dn2Component),
    inputs:{
      name:"COmpp2"
    }
  }
]

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.less']
})
export class RecipeDetailComponent implements OnInit{
  public caretValue:any
  caretTop  =true;
  caretBottom!:boolean ;
  public id!:number;
  // public hideMenus!: boolean;   without directives
 public recipe!:Recipe;
  showMenu: any;
  public RecSub! :Subscription
  @ViewChild('container' ,{read:ViewContainerRef}) container!:ViewContainerRef;

  constructor(private resService:RecipeService,private router :ActivatedRoute,private navRouter :Router){}
  ngOnInit(): void {
  //  console.log(this.recipe)
  this.router.params.subscribe((params:Params)=>{
    this.id = +params['id'];
    this.recipe = this.resService.getRecipe(this.id)
  
  })
  const id = this.router.snapshot.params['id']
  }
  hideMenus(event:any){
    this.caretTop = event[1]
    this.caretBottom = event[2]
    this.showMenu = event[0]
  }

  // with services
  addShopList(){
    this.resService.addRecIngrdient(this.recipe.ingredients)
    this.navRouter.navigate(['/shopList'])
  }
  onEditRecipe(){
    this.navRouter.navigate(['../', this.id, 'edit'], {relativeTo:this.router})
  }
  deleteRecipe(){
    this.resService.deleteRecipe(this.id)
    this.navRouter.navigate(['/recipes'], {relativeTo:this.router})
  }

  addDynamic(){
    const data = this.container.createComponent(dnComponent)
    data.instance.name = "lakshmi";
    data.setInput('name','lakshmi')
  }
  componentConfig(){
      ComponentComnfig.forEach(async (kc)=>{
        const cmpInstance = await kc.component;
        const Ref =this.container.createComponent(cmpInstance);

        // Object.entries(kc.inputs).forEach(([key,value])=>{
        //   Ref.setInput(key,value);
        // })
      })
  }
 
  // without directives
  // manageCaret(){
  //   this.caretBottom= !this.caretBottom;
  //   this.caretTop= !this.caretTop;
  //   this.hideMenus = !this.hideMenus
  // }
}
