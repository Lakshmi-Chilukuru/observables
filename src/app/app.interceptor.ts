import { HttpInterceptor,HttpRequest,HttpResponse,HttpHandler,HttpEvent } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, tap, throwError } from "rxjs";
import { RootService } from "./root.service";
import {Errors} from './employee'


@Injectable()

// export class AppInterceptor implements HttpInterceptor {
//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     return next.handle(req).pipe(
//         tap({
//             next: (event:HttpEvent<any>) => {
//                 if (event instanceof HttpResponse) {
//                     console.log('Response received:', event);
//                 }
//             },
//             error: (error) => {
//                 console.error('Request error:', error);
//             }   
//         })
//     )  }
// }
export class AppInterceptor implements HttpInterceptor{
    constructor(private rootService:RootService){}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req.clone({setHeaders:{API_KEY:"Lakshm_APi"}})).pipe(
            tap({
                next:(event:HttpEvent<any>)=>{
                    let eventUrl;
                    if(event instanceof HttpResponse){
                        console.log("Api Response:" ,event)
                        eventUrl = event.url?.split('/');
                        eventUrl =eventUrl?.map(e=>{
                            if(e == "recipes.json"){
                                e = "recipes.json-el"
                            }
                            return e;
                        })
                        eventUrl =eventUrl?.join('/')
                        console.log(eventUrl)
                    }
                },
                error:()=>{
                    catchError((error)=>{
                    if(error.status == Errors[error.status]){
                        console.log("Err Status:" + error.status)
                        this.rootService.showLoader$.next(true)
                    }
                    return throwError(()=>error)
                })
                },
                
            })
        )
    }
}

