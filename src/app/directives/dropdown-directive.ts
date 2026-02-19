import {Directive, EventEmitter, HostListener, Input, Output} from '@angular/core'

@Directive({
    selector : '[dropDownDir]'
})

export class DropDownDir{
    isActive  = false;
    @Input() caretTop!:boolean ;
    caretBottom = false;
    hideMenus =false;
    @Output() hidingMenus = new EventEmitter<any>()


    @HostListener('click') activate(){
        this.isActive = !this.isActive
        this.caretTop = !this.caretTop;
        this.caretBottom = !this.caretBottom;
        this.hideMenus = !this.hideMenus
        this.hidingMenus.emit([this.hideMenus,this.caretTop,this.caretBottom])

    }
}