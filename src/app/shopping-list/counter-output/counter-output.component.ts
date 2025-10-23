import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';


@Component({ 
  selector: 'app-counter-output',
  templateUrl: './counter-output.component.html',
  styleUrls: ['./counter-output.component.less']
})
export class CounterOutputComponent {
  counter$:Observable<number>
  constructor(store:Store<{counter:number}>){
    this.counter$ = store.select('counter');
  }
}
