import { Injectable } from '@angular/core';
import { ErrorService } from './error.service';
import { Global } from '../global.variable';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { transaction, transExt, transRef, total, itemList } from './service.interface';
import { HttpClient } from '@angular/common/http';
import { ItemService } from './item.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(
    private http  : HttpClient, 
    public  ehs   : ErrorService,
    private IS    : ItemService,
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
                itemID          : null,
                packageName     : null,
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
            let packItem: itemList[] = [];
            for (let ii = 0; ii < items.length; ii++) {
              if(Number.isInteger(items[ii].itemId)){
                transRefNum.push(items[ii].neededTest);
              }
              else{
                packItem.push(items[ii]);
              }            
            }
            if( packItem.length > 0 ){
              for (let pi = 0; pi < packItem.length; pi++) { 
              let _packItem: any;
              this.IS.getPackExt(packItem[pi].itemId).subscribe(
                packItem => {
                    _packItem = packItem;                           
                },
                (err: any) => console.error(err),
                () => {
                  for (let ri = 0; ri < _packItem.length; ri++) {
                      this.IS.getItemByID(_packItem[ri].itemID).subscribe(
                      itemTest => {
                        transRefNum.push(itemTest[0].neededTest);
                        
                        if( packItem.length === pi + 1 && _packItem.length === ri + 1){

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
                        }

                      },
                      (err: any) => console.error(err),
                      () => {
                                          
                      }                    
                    )  
                  }                     
                }
              ) 
              }             
            }   
          },
          (error: any) => console.error(error),
          () => {
          }
        );
      }
    )
  }


}
