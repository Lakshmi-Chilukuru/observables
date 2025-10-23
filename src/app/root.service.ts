import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {employeeType} from './employee'
import { Observable } from 'rxjs';
import {map,catchError} from 'rxjs/operators'

// import 'rxjs/add/operator'


@Injectable({
  providedIn: 'root'
})
export class RootService {
  // private _url:string = 'localhost:3000/polls'

  constructor(private http:HttpClient) { }

  // getQuestion():Observable<any>{
  //   return this.http.get<any>(`${this._url}/fetch`)
  // }

  // createPoll(data:any):Observable<any>{
  //   return this.http.put<any>(`${this._url}/create`,data)
  // }

  // updateVoting(data:any):Observable<any>{
  //   return this.http.patch<any>(`${this._url}/updateVotes`,data)
  // }
  
}
