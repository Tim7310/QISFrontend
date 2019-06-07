import { Injectable } from '@angular/core';
import { ErrorService } from './error.service';
import { Global } from '../global.variable';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { transaction, transExt, transRef, total, itemList } from './service.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(
    private http  : HttpClient, 
    public  ehs   : ErrorService,
    private global: Global
  ) { }

  getTransactions( type ): Observable<transaction[]>{
    return this.http.get<transaction[]>(this.global.url + "/" + type)
    .pipe(
        retry(1),
        catchError(this.ehs.handleError)
    )
  }

  getOneTrans( type ): Observable<transaction>{
    return this.http.get<transaction>(this.global.url + "/" + type)
    .pipe(
        retry(1),
        catchError(this.ehs.handleError)
    )
  }
  
  addTrans(trans: transaction): Observable<transaction> {
    return this.http.post<transaction>(
      this.global.url + "/addTransaction", 
      trans, this.global.httpOptions)
      .pipe(
        retry(1),
        catchError(this.ehs.handleError)
      );
  } 

  addTransExt(trans: transExt): Observable<transExt> {
    return this.http.post<transExt>(
      this.global.url + "/addTransext", 
      trans, this.global.httpOptions)
      .pipe(
        retry(1),
        catchError(this.ehs.handleError)
      );
  }

  addTransRef(trans: transRef): Observable<transRef> {
    return this.http.post<transRef>(
      this.global.url + "/addTransref", 
      trans, this.global.httpOptions)
      .pipe(
        retry(1),
        catchError(this.ehs.handleError)
      );
  }

  transRefGen(arr: number[], transID: number, PatID: number){
    let ref : transRef = {
      transactionID   : transID,
      patientID       : PatID,
      xray            : 0,
      blood           : 0,
      urine           : 0,
      stool           : 0,
      physicalExam    : 0,
      specimen        : 0,
      ultrasound      : 0,
      ecg             : 0,
      others          : 0,
      // _2DEcho          : 0
    }
    arr.forEach(num => {
      if( num === 1){
        ref.xray = 1;
      }else if( num === 2 ){
        ref.blood = 1;
      }else if( num === 3 ){
        ref.urine = 1;
      }else if( num === 4 ){
        ref.stool = 1;
      }else if( num === 5 ){
        ref.physicalExam = 1;
      }else if( num === 6 ){
        ref.specimen = 1;
      }else if( num === 7 ){
        ref.ultrasound = 1;
      }else if( num === 8 ){
        ref.ecg = 1;
      }else if( num === 9 ){
        ref.others = 1;
      }
      // else if( num === 10 ){
      //   ref._2DEcho = 1;
      // }
    });
    return ref;
  }
  
  saveTransaction(
    transaction     : transaction,
    total           : total[],
    items           : itemList[]
  ){
    this.addTrans(transaction).subscribe(
      data => {
        // next function
      },
      (error: any) => console.error(error),
      () => {
        // get input transaction data
        let urlRef = "getTransRef/" + transaction.transactionRef;
        this.getOneTrans(urlRef).subscribe(
          transData => {
            total.forEach(item => {
              let ext: transExt = {
                transactionID   : transData[0].transactionId,
                itemID          : 0,
                packageName     : "",
                itemQTY         : item.quantity,
                itemDisc        : item.discount
              }
              if(Number.isInteger(item.id)){
                ext.itemID = item.id;
              }
              else{
                ext.packageName = item.id;
              }
              // insert into transext table to database
              this.addTransExt(ext).subscribe(
                extData => { },
                (error: any) => console.error(error),
              )
            });
            let transRefNum: number[] = [];
            items.forEach(item => {
              transRefNum.push(item.neededTest);
            });
            let refGen = this.transRefGen(
              transRefNum, 
              transData[0].transactionId, 
              transData[0].patientId              
              )
            // insert into transRef table to database
            this.addTransRef(refGen).subscribe(
              extData => { },
              (error: any) => console.error(error),
            )
          },
          (error: any) => console.error(error),
          () => {
          }
        );
      }
    )
  }


}
