import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeBookComponent } from './recipe-book/recipe-book.component';
import { RecipeListComponent } from './recipe-book/recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipe-book/recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './recipe-book/recipe-list/recipe-item/recipe-item.component';
import { RecipeStartComponent } from './recipe-book/recipe-list/recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipe-book/recipe-edit/recipe-edit.component';
import { AuthComponent } from './auth/auth.component';
import { authGuard } from './shared/auth.guard';
import { TemplateComponent } from './template/template.component';
import { ReactiveComponent } from './reactive/reactive.component';
import { ViewdetailsComponent } from './viewdetails/viewdetails.component';

const routes: Routes = [
  {
    path:'',component:RecipeBookComponent,
  },
  {
    path:'recipes',component:RecipeBookComponent,
    children :[
      {
        path:'', component:RecipeStartComponent
      },
      {
        path:'new',component:RecipeEditComponent
      },{
        path:':id', component:RecipeDetailComponent
      },
      {
        path:':id/edit',component:RecipeEditComponent
      },
      // {
      //   path:'item',component:RecipeItemComponent
      // },
      {
        path:'recipeList',component:RecipeListComponent
      },
      // {
      //   path:'detail', component:RecipeDetailComponent
      // }
    ]
  },
  {
    path:'auth', component:AuthComponent
  },
  {
    path:'shopList',component:ShoppingListComponent
  },
  {
    path :'template',component:TemplateComponent
  },
  {
    path :'reactive',component:ReactiveComponent
  },
  {
    path:'viewdetails',component:ViewdetailsComponent
  },
  {
    path:'', redirectTo: '/recipes' ,pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
