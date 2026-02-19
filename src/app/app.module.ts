import { NgModule,APP_INITIALIZER, ErrorHandler  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeBookComponent } from './recipe-book/recipe-book.component';
import { ShoppingListEditComponent } from './shopping-list/shopping-list-edit/shopping-list-edit.component';
import { RecipeListComponent } from './recipe-book/recipe-list/recipe-list.component';
import { RecipeItemComponent } from './recipe-book/recipe-list/recipe-item/recipe-item.component';
import { RecipeDetailComponent } from './recipe-book/recipe-detail/recipe-detail.component';
import { DropDownDir } from './directives/dropdown-directive';
import { ShoppingService } from './shopping-list/shopping.service';
import { RecipeStartComponent } from './recipe-book/recipe-list/recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipe-book/recipe-edit/recipe-edit.component';
import { RecipeService } from './recipe-book/recipe.service';
import { RecipeDesc } from './recipe-book/recipe.pipe';
import { FilterPipe } from './recipe-book/recipeFilter.pipe';
import { DataStorageService } from './shared/data-storage.service';
import { AuthComponent } from './auth/auth.component';
import { LoaderComponent } from './shared/loader.component';
import { StoreModule } from '@ngrx/store';
import { counterReducer } from './store1/counter.reducer';
import { CounterOutputComponent } from './shopping-list/counter-output/counter-output.component';
import { CounterControlsComponent } from './shopping-list/counter-controls/counter-controls.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { TemplateComponent } from './template/template.component';
import { ReactiveComponent } from './reactive/reactive.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule} from '@angular/material/form-field';
import { ViewdetailsComponent } from './viewdetails/viewdetails.component';
import { AppInterceptor } from './app.interceptor';
import { ChangeColorDirective } from './color.directive';

import * as Sentry from "@sentry/angular";
import { Router } from '@angular/router';
import { CurrencyDirective } from './directives/currency-directive';
import { TokenInterceptor } from './token.interceptor';
// import { SharedUiComponent } from 'shared-ui'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ShoppingListComponent,
    RecipeBookComponent,
    ShoppingListEditComponent,
    RecipeListComponent,
    RecipeItemComponent,
    RecipeDetailComponent,
    DropDownDir,
    RecipeStartComponent,
    RecipeEditComponent,
    RecipeDesc,
    FilterPipe,
    AuthComponent,
    LoaderComponent,
    CounterOutputComponent,
    CounterControlsComponent,
    TemplateComponent,
    ReactiveComponent,
    ViewdetailsComponent,
    ChangeColorDirective,
    CurrencyDirective
  ],
  imports: [
    BrowserModule,
    ScrollingModule,
    AppRoutingModule,
MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot({counter:counterReducer}),
    BrowserAnimationsModule,
  ],
  providers: [ShoppingService, RecipeService,DataStorageService,
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}},
    { provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    {
      provide: ErrorHandler,
      useValue: Sentry.createErrorHandler(),
    },
    {
      provide: Sentry.TraceService,
      deps: [Router],
    },
    {
      provide: APP_INITIALIZER,
      useFactory: () => () => {},
      deps: [Sentry.TraceService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
