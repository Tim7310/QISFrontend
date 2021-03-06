import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MathService } from 'src/app/services/math.service';
import { AccountingService } from 'src/app/services/accounting.service';
import { billing, transaction, personnel, patient, itemList } from 'src/app/services/service.interface';
import { TransactionService } from 'src/app/services/transaction.service';
import { DatePipe } from '@angular/common';
import { ItemService } from 'src/app/services/item.service';
import { PatientService } from 'src/app/services/patient.service';
export interface titems {
  trans: transaction,
  items: itemList[],
  patient: patient
}
@Component({
  selector: 'billing-pdf',
  templateUrl: './billing-pdf.component.html',
  styleUrls: ['./billing-pdf.component.scss']
})
export class BillingPdfComponent implements OnInit {
  type = "0";
  id: string[];
  idDetails: Promise<any>[];
  billing: billing;
  personnel: personnel[];
  prepared: personnel;
  verified: personnel;
  validated: personnel;
  patient: patient;
  trans: titems[] = [];
  companyName: string;

  constructor(
    route: ActivatedRoute,
    private math: MathService,
    private AS: AccountingService,
    private TS: TransactionService,
    private datePipe: DatePipe,
    private IS: ItemService,
    private PS: PatientService
  ) {
    this.id = route.snapshot.params['ids']
      .split(',');
  }

  ngOnInit() {
    this.idDetails = this.id
      .map(id => this.getInvoiceDetails(id));

    Promise.all(this.idDetails)
      .then(() => this.math.onBillingReady());

    this.AS.getBil(parseInt(this.id[0])).subscribe(
      data => {
        this.IS.getCompanyByID(data[0].companyID).subscribe(
          com => {   
             this.companyName = com[0].nameCompany;
          }
        )
        this.billing = data[0];
        let ids = data[0].transIds.split(",");
        ids.forEach((id, index) => {
          this.TS.getOneTrans("getTransaction/" + id).subscribe(
            trans => {
              this.trans.push({
                trans: trans[0],
                items: [],
                patient: undefined
              })
              console.log(this.trans);
              
              this.TS.getTransExt(trans[0].transactionId).subscribe(
                ext => {
                  ext.forEach((element, i) => {
                    if (element.packageName != null) {
                      this.IS.getPack("getPackageName/" + element.packageName)
                        .subscribe(
                          pack => {
                            let packItem: itemList = {
                              itemId: pack[0].packageName,
                              itemName: pack[0].packageName,
                              itemPrice: pack[0].packagePrice,
                              itemDescription: pack[0].packageDescription,
                              itemType: pack[0].packageType,
                              deletedItem: pack[0].deletedPackage,
                              neededTest: undefined,
                              creationDate: pack[0].creationDate,
                              dateUpdate: pack[0].dateUpdate,
                            }
                            this.trans[index].items.push(packItem);
                          }
                        )
                    } else if (element.itemID != null) {
                      this.IS.getItemByID(element.itemID)
                        .subscribe(item2 => {
                          this.trans[index].items.push(item2[0]);
                        });
                    }
                  });
                }
              )
              this.PS.getOnePatient("getPatient/" + trans[0].patientId).subscribe(
                pat => {
                  this.trans[index].patient = pat[0];
                }
              )
              this.IS.getCompanyByID(data[0].companyID).subscribe(
                com => {
                  if (trans[0].biller != com[0].nameCompany) {
                    this.type = "1";
                  }
                }
              )
            }
          )
        });

        this.AS.getPersonnel(data[0].prepared).subscribe(
          data => {
            if (data.length == 1) {
              this.prepared = data[0];
            }
          }
        )
        this.AS.getPersonnel(data[0].verified).subscribe(
          data => {
            if (data.length == 1) {
              this.verified = data[0];
            }
          }
        )
        this.AS.getPersonnel(data[0].validated).subscribe(
          data => {
            if (data.length == 1) {
              this.validated = data[0];
            }
          }
        )
      }
    )

  }

  getInvoiceDetails(invoiceId) {
    const amount = Math.floor((Math.random() * 100));
    return new Promise(resolve =>
      setTimeout(() => resolve({ amount }), 1000)
    );
  }

  convertDate(date: string) {
    return this.datePipe.transform(new Date(date), "mediumDate");
  }

  computeTotal(item: itemList[]){
    let total : number = 0;
    item.forEach(i => {
      total = total + i.itemPrice;
    });
    return total;
  }

  computeTotals(titems: titems[]){
    let totals: number = 0;
    titems.forEach(t => {
      totals = totals + this.computeTotal(t.items);
    });
    return totals;
  }
}
