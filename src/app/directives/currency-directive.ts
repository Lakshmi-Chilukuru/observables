import {Directive, ElementRef, HostListener} from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
    selector:'[appCurrency]'
})
export class CurrencyDirective {
    constructor(private el:ElementRef,private control:NgControl){
        
    }
   @HostListener('blur')
  // onBlur() {
  //   const value = this.control.value;
  //   if (value !== null && value !== '') {
  //     this.el.nativeElement.value = this.format(value);
  //   }
  // }

  // Remove formatting while typing
  // @HostListener('input', ['$event.target.value'])
  // onInput(value: string) {
  //   const numericValue = this.parse(value);
  //   this.control.control?.setValue(numericValue, { emitEvent: false });
    
  // }

  // Show raw number on focus
  // @HostListener('focus')
  // onFocus() {
  //   const value = this.control.value;
  //   if (value !== null && value !== '') {
  //     this.el.nativeElement.value = value;
  //   }
    
  // }

  // private format(value: number): string {
  //   return `$ ${value.toLocaleString('en-IN', {
  //     minimumFractionDigits: 2,
  //     maximumFractionDigits: 2,
  //   })}`;
  // }

  // private parse(value: string): number {
  //   return Number(value.replace(/[^0-9.]/g, ''));
  // }

 @HostListener('focus')
  onFocus(){
    console.log(this.el.nativeElement.value)
  }

  @HostListener('input',['$event'])
  onInput(event:any){
    const inValue = this.el.nativeElement.value;
    this.el.nativeElement.value = this.el.nativeElement.value.replace(/[^0-9.]/g ,'')
    if(inValue != this.el.nativeElement.value){
      event.stopPropagation();
    }
    console.log(event);
  }

  @HostListener('blur')
  onBlur(){
    const valuv = this.el.nativeElement.value
    const chValue = new Intl.NumberFormat('en-US',{
      style:'currency',
      currency:'USD'
    }).format(valuv)
    this.el.nativeElement.value = chValue;
  }

 


}