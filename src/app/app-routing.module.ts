import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReceiptComponent } from './element/receipt/receipt.component';
import { TransactionComponent } from './page/transaction/transaction.component';
import { ErrorPageComponent } from './page/error-page/error-page.component';
import { TransactionListComponent } from './element/transaction-list/transaction-list.component';

const routes: Routes = [
  { path: 'print/:ids',
    outlet: 'print',
    component: ReceiptComponent
  },
  {
    path: '', redirectTo: '/cashier/transact', pathMatch: 'full'
  },
  {
    path: 'cashier/transact',
    component: TransactionComponent,
  },
  {
    path: 'cashier/transactions',
    component: TransactionListComponent,
  },
  {
    path: '**', component: ErrorPageComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
