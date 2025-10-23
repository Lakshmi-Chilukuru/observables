import { Component, Input } from "@angular/core";

@Component({
    selector:'app-dnm2',
    template:`I am dynamic component
    <p>{{name}}</p>`
})
export class dn2Component{
    @Input() name:any;
}