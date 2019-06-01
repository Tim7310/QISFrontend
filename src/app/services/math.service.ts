import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MathService {

  constructor() { }

  convertDate(date){
    var dateString = 
      new Date(
        date.getTime() - (date.getTimezoneOffset() * 60000 ))
        .toISOString().split("T")[0];
    return dateString;
  }
  
  randomNumber(min:number = 0, max:number = 100000000): number {
    var rn = Math.floor(Math.random() * (max - min)) + min;
    return rn;
  }
  checkRef(data){
    let pat = data;
    let rn;
    do{
      rn = this.randomNumber();
      var found = pat.find(data => data.patientRef == rn);
    }
    while(found !== undefined);
    return rn;
  }
  
}
