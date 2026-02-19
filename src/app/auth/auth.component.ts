import { Component, inject, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['auth.component.less'],
})
export class AuthComponent implements OnInit{
  public isLoginMode = true;
  public isLoading = false;
  public error = '';
  public registerForm!:FormGroup
  private fb =inject(FormBuilder)
  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName:['',Validators.required],
      mail:['',Validators.required],
      password:['',Validators.required],
      confirmPassword:['',Validators.required]
    })
  }

  switchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
  onSubmit(){
    if(this.registerForm.invalid){
    return
    } 
    console.log(this.registerForm.value)
    this.registerForm.reset()
  }
  // onSubmit(form: NgForm) {
  //   if (!form.valid) {
  //     return;
  //   }
  //   // this.isLoading = true;
    
  //   let authObs: Observable<AuthResponseData>
  //   if (this.isLoginMode) {
  //       authObs = this.authService.getLogin(form.value.email, form.value.password);
  //   } else {
  //       authObs = this.authService.setLogin(form.value.email, form.value.password)
  //   }
  //   authObs.subscribe(response=>{
          
  //           if(response.registered){
  //               this.router.navigate(['/recipes'])
  //           }
  //       },(errorRes) => {
           
  //           this.error = errorRes
  //           this.isLoading = false;
  //         })
  //   form.reset();
  // }

  closeError(){
    this.error ="";
  }
}
