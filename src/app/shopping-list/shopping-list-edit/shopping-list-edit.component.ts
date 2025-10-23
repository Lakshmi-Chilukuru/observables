import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder,FormControl,FormGroup,NgForm,Validators } from '@angular/forms';
import { Ingredient } from '../shopping-list.model';
import { ShoppingService } from '../shopping.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list-edit',
  template:  `
    <div class="alert">
      <ng-content></ng-content>  <!-- Content goes here -->
    </div>
  `,
  styleUrls: ['./shopping-list-edit.component.less']
})
export class ShoppingListEditComponent implements OnInit,OnDestroy{
  shoppingEdit:FormGroup;
  subscription!:Subscription;
  // shopSub!:Subscription;
  // @Output() emitShopDetails =new EventEmitter<any>();
  @ViewChild('nameInput', { static: false })  nameInputRef!: ElementRef;
  @ViewChild('amountInput', { static: false })  amountInputRef!: ElementRef;
  @ViewChild('shop') slForm!:NgForm;
  public nameValidator:string ='Name is Required';
  public amountValidator:string ='Amount is Required';
  public minAmountValidator:string='Minimum Amount atleast Rupee should mention the cost'
  editMode: boolean =false;
  editIndexItem!: number;
  editedItem!:Ingredient
  constructor(private fb:FormBuilder,private ingSerivce:ShoppingService){
    this.shoppingEdit = this.fb.group({
      'name':['',Validators.required],
      'amount':['',Validators.required,Validators.min(1)]
    })
  }
  ngOnInit(): void {
    this.subscription =this.ingSerivce.editSelected.subscribe((index:number)=>{
      this.editIndexItem = index;
      this.editMode = true;
      this.editedItem = this.ingSerivce.getIngredient(index)
      this.slForm.setValue(
        {
          name:this.editedItem.name,
          amount:this.editedItem.amount
        }
      )
      // this.shoppingEdit.value.name = this.editedItem.name
      // this.shoppingEdit.value.amount = this.editedItem.amount

    })
  }
  get name(){
    return this.shoppingEdit.get('name');
  }
  get amount(){
    return this.shoppingEdit.get('amount')
  }
  //  onSubmit(){
  //   if(this.shoppingEdit.valid){
  //     console.log(this.shoppingEdit.value)
  //   }
  // }
  onSubmit(data:NgForm){
    console.log(data)
    const newIngredient = new Ingredient(data.value.name,data.value.amount)
    if(this.editMode){
      this.ingSerivce.updateIngredient(this.editIndexItem,newIngredient)
      
    }else{
    this.ingSerivce.addIngredient([newIngredient])
    }
    this.editMode = false;
    data.reset()
  }
  // onAddCart(){
  //   const newIngredient = new Ingredient(this.nameInputRef.nativeElement.value,this.amountInputRef.nativeElement.value)
  //   // this.emitShopDetails.emit(newIngredient)
  //   this.ingSerivce.addIngredient([newIngredient])
  //   this.nameInputRef.nativeElement.value =""
  //   this.amountInputRef.nativeElement.value =""
  // }
  onClearCart(){
    this.slForm.setValue(
        {
          name:"",
          amount:""
        }
      )
      this.editMode=false;
//  this.nameInputRef.nativeElement.value =""
//     this.amountInputRef.nativeElement.value =""
  }

  onDeleteCart(){
    if(this.editMode){
      this.ingSerivce.deleteIngredient(this.editIndexItem)
    }
    this.onClearCart();    
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
