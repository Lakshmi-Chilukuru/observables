import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.less']
})
export class ReactiveComponent {
public data$ !:Observable<any>;
  constructor(private ds:DataStorageService){
{
   this.ds.getUsers().subscribe((val)=>{
      console.log(val)
    })
}
  }
}
