import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class Global {
url: string = "http://localhost:8086";
userID: number = 12;
public httpOptions = {
  headers: new HttpHeaders({
    'Content-Type'  : 'application/json',
    'Authorization' : 'my-auth-token'
  })
};
  constructor() { }
  
}