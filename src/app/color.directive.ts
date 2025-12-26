import { Directive, ElementRef, HostBinding, HostListener, Renderer2 } from "@angular/core";

@Directive({
    selector : '[colorDir]'
})  

export class ChangeColorDirective{
    constructor(private el:ElementRef,private renderer:Renderer2){
        this.el.nativeElement.style.backgroundColor ="yellow"
    }
    
    @HostListener('mouseenter') onMouseEnter(){
        this.renderer.setStyle(
            this.el.nativeElement,'background-color','red'
        )
    }
    
    @HostListener('mouseleave') 
    onMouseLeave(){
        this.renderer.removeStyle(
            this.el.nativeElement,'background-color'
        )
    } 

    @HostListener('click')
    onClick(){
        // console.log("clicked from Directive")
    }

    // @HostBinding()

}