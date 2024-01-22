import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserRegistrationService {
  private _url = "http://localhost:9000/users/"

  constructor(private http: HttpClient) { }

  getUser()
  {
      return this.http.get<IUser>(this._url)
  }
  getSingleUser(userEmail:string)
  {
      console.log(this._url+userEmail);
      return this.http.get<Number>(this._url+userEmail)
  }
  postUser(body:any){
    const headers = { 'content-type': 'application/json'}  
    const body1=JSON.stringify(body);
    //console.log(body1)
    this.http.post(this._url, body1,{'headers':headers}).subscribe(data => {
      console.log(data)
    });
  }
  
}
