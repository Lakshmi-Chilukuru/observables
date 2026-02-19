import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import { catchError, finalize, Observable, tap, throwError } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
      console.log('Interceptor triggered:', request.url);

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Interceptor caught error:', error);
        return throwError(() => error);
      })
    );
  
  }
}
