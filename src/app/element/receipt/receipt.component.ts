import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MathService } from 'src/app/services/math.service';
import { TransactionService } from 'src/app/services/transaction.service';
import { transaction, patient, itemList, trans_items } from 'src/app/services/service.interface';
import { PatientService } from 'src/app/services/patient.service';
import * as moment from 'moment';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.scss']
})
export class ReceiptComponent implements OnInit {
  trans         : string[];
  transDetails  : Promise<any>[];
  transData     : transaction;
  patient       : patient;
  item          : trans_items[] = [];

  constructor(
    route: ActivatedRoute,
    private math: MathService,
    private TS: TransactionService,
    private PS: PatientService,
    private IS: ItemService
  ) {
    this.trans = route.snapshot.params['ids']
      .split(',');
   }

  ngOnInit() {
    this.transDetails = this.trans
      .map(id => this.getInvoiceDetails(id));
      
    Promise.all(this.transDetails)
      .then(() => this.math.onDataReady());

      this.TS.getOneTrans("getTransaction/" + this.trans)
      .subscribe(
        data => {
          this.transData = data[0];
          
          this.PS.getOnePatient("getPatient/" + data[0].patientId)
          .subscribe( pat => {
            this.patient = pat[0];
            this.patient.age = moment().diff(this.patient.birthdate, 'years');
          })

          this.TS.getTransExt(data[0].transactionId)
          .subscribe(
            item => {
              item.forEach(itemData => {
                // if the item is package
                if(itemData.packageName != null){
                  this.IS.getPack( "getPackageName/" + itemData.packageName )
                  .subscribe(
                    pack => {
                      var iPack: itemList = {
                        itemId          : pack[0].packageName,
                        itemName        : pack[0].packageName,
                        itemPrice       : pack[0].packagePrice,
                        itemDescription : pack[0].packageDescription,
                        itemType        : pack[0].packageType,
                        deletedItem     : pack[0].deletedPackage,
                        neededTest      : null,
                        creationDate    : pack[0].creationDate,
                        dateUpdate      : pack[0].dateUpdate,
                      }
                      this.item.push({item: iPack, ext: itemData});
                    }
                  )
                }else{ 
                  //if the item is normal item
                  this.IS.getItemByID(itemData.itemID)
                  .subscribe(
                    itemInfo => {
                      this.item.push({item: itemInfo[0], ext: itemData});
                    }
                  )
                }
              });
            }
          )
        }   
      )
  }
  getInvoiceDetails(invoiceId) {
    const amount = Math.floor((Math.random() * 100));
    return new Promise(resolve =>
      setTimeout(() => resolve({amount}), 1000)
    );
  }
}
