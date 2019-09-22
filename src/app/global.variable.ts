import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class Global {
url: string = "http://desktop-i3pua41:8088";
userID: number = parseInt(sessionStorage.getItem("token"));
public httpOptions = {
  headers: new HttpHeaders({
    'Content-Type'  : 'application/json',
    'Authorization' : 'my-auth-token'
  })
};
  constructor() { }
  
}