import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, delay,  Subject,  tap, throwError } from 'rxjs';
import { User } from '../shared/user';
import { Router } from '@angular/router';
export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: number;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public user= new Subject<User>();
  public authenticate = new Subject();
  expirationTimer: number | null | undefined;
  constructor(private http: HttpClient ,private router:Router) {}
  api_keySignUp =
    'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC6Be57GlVkYnIO4MpOwz3mkHxPW6e1juE';
  api_KeyLogin =
    'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC6Be57GlVkYnIO4MpOwz3mkHxPW6e1juE';
  
  setLogin(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(this.api_keySignUp, {
        email: email,
        password: password,
        returnSecureToken: true,
      })
      .pipe(
        delay(2000),
        catchError(this.ErrorMethod),
        tap(resData =>{this.handleUserData(resData.email,resData.localId,resData.refreshToken,resData.expiresIn)})
      );
  }

  logOut(){
    // const user = new User(null,null,null,null)
    // this.user.next(user); 
    this.authenticate.next(false)
    this.router.navigate(['/auth'])
    if(this.expirationTimer){
      clearTimeout(this.expirationTimer)
    }
    this.expirationTimer= null
    
  }
  autoLogOut(expirationDuration:number){
    this.expirationTimer =setTimeout(()=>{
      this.logOut()
    },expirationDuration)
  }

  getLogin(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(this.api_KeyLogin, {
        email: email,
        password: password,
        returnSecureToken: true,
      })
      .pipe(
        delay(2000),
        catchError(this.ErrorMethod),
        tap(resData =>{this.handleUserData(resData.email,resData.localId,resData.refreshToken,resData.expiresIn)})
      );
      
  }

  private handleUserData(email:string,userId:string,token:string,expiresIn:number){
    const date = new Date(new Date().getTime() + +expiresIn*1000)
    const user = new User(email,userId,token,date)
    this.user.next(user);
    this.autoLogOut(expiresIn*1000)
  }
  private ErrorMethod(errorRes: any) {
    let errorMsg = 'Please Check Your Network';
    if (!errorRes.error || !errorRes.error.error || errorRes.status === '0') {
      return throwError(errorMsg);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMsg = 'The email address is already in use by another account';
        break;
      case 'OPERATION_NOT_ALLOWED':
        errorMsg = 'Password sign-in is disabled for this project';
        break;
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        errorMsg =
          'We have blocked all requests from this device due to unusual activity. Try again later.';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMsg = 'There is no user record corresponding to this identifier.';
        break;
      case 'INVALID_PASSWORD':
        errorMsg =
          'The password is invalid or the user does not have a password.';
        break;
      case 'INVALID_LOGIN_CREDENTIALS':
        errorMsg = 'Please Check Mail Id and Password Correctly';
        break;
      case 'USER_DISABLED':
        errorMsg = 'The user account has been disabled by an administrator.';
    }
    return throwError(errorMsg);
  }
}
