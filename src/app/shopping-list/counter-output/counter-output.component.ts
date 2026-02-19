import { ChangeDetectionStrategy, Component,ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';
import { ShoppingService } from '../shopping.service';
import { ICount } from '../Store/data';
import { select, Store } from '@ngrx/store';


@Component({ 
  selector: 'app-counter-output',
  templateUrl: './counter-output.component.html',
  styleUrls: ['./counter-output.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CounterOutputComponent {
  
   public counteer$: Observable<number>;
  constructor(private ingS:ShoppingService,private cd:ChangeDetectorRef,private store:Store<ICount>){

    this.counteer$ = this.store.pipe(select('count'));
  }

  detect(){
    this.cd.detectChanges();
  }
  markCheck(){
    this.cd.markForCheck();
  }
  detach(){
    this.cd.detach();
  }
  reattach(){
    this.cd.reattach()
  }


}
