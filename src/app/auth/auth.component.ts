import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthResponseData, AuthService } from './auth.service';
import {  Router } from '@angular/router';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['auth.component.less'],
})
export class AuthComponent {
  public isLoginMode = true;
  public isLoading = false;
  public error = '';

  constructor(private authService: AuthService,private router:Router) {}

  switchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    // this.isLoading = true;
    
    let authObs: Observable<AuthResponseData>
    if (this.isLoginMode) {
        authObs = this.authService.getLogin(form.value.email, form.value.password);
    } else {
        authObs = this.authService.setLogin(form.value.email, form.value.password)
    }
    authObs.subscribe(response=>{
          
            if(response.registered){
                this.router.navigate(['/recipes'])
            }
        },(errorRes) => {
           
            this.error = errorRes
            this.isLoading = false;
          })
    form.reset();
  }

  closeError(){
    this.error ="";
  }
}
