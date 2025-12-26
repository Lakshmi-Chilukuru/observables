import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from './user.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.less']
})
export class TemplateComponent {
  constructor(private router:Router){}
  private static id:number =1;

  user : User ={
    cname:'',
    name:'',
    tname:'',
  };

  nextId = TemplateComponent.id++
  onSubmit(contactForm: NgForm,user:User) {
        // Your form submission logic here
        console.log('Form Submitted!', contactForm.value);
        const userData ={
          id:this.nextId++,
          ...user
        }
        console.log("user =>", userData)
        contactForm.reset()
        this.router.navigate(['/viewdetails'])
    }
}
