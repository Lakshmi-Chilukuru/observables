import {Directive, EventEmitter, HostBinding, HostListener, Input, OnInit, Output} from '@angular/core'

@Directive({
    selector : '[dropDownDir]'
})

export class DropDownDir implements OnInit{
    constructor(){}
    isActive :boolean = false;
    @Input() caretTop!:boolean ;
    caretBottom:boolean = false;
    hideMenus: boolean =false;
    @Output() hidingMenus = new EventEmitter<any>()

    ngOnInit(): void {
        
    }

    @HostListener('click') activate(){
        this.isActive = !this.isActive
        this.caretTop = !this.caretTop;
        this.caretBottom = !this.caretBottom;
        this.hideMenus = !this.hideMenus
        this.hidingMenus.emit([this.hideMenus,this.caretTop,this.caretBottom])

    }
}