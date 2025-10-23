import { Component, Input } from "@angular/core";

@Component({
    selector:'app-dnm',
    template:`I am dynamic component
    <p>{{name}}</p>`
})
export class dnComponent{
    @Input() name:any;
}