import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReceiptComponent } from './element/receipt/receipt.component';
import { TransactionComponent } from './page/transaction/transaction.component';
import { ErrorPageComponent } from './page/error-page/error-page.component';
import { TransactionListComponent } from './element/transaction-list/transaction-list.component';
import { HMOListComponent } from './page/hmo-list/hmo-list.component';
import { ReportListComponent } from './page/report-list/report-list.component';
import { ManagePackageComponent } from './page/manage-package/manage-package.component';
import { SalesPdfComponent } from './element/sales-pdf/sales-pdf.component';
import { AuthenticationComponent } from './page/authentication/authentication.component';
import { SigninComponent } from './element/signin/signin.component';
import { SignupComponent } from './element/signup/signup.component';

const routes: Routes = [
  { path: 'print/:ids',
    outlet: 'print',
    component: ReceiptComponent
  },
  { path: 'print/:dates',
    outlet: 'salesReport',
    component: SalesPdfComponent
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
    path: 'cashier/hmo',
    component: HMOListComponent,
  },
  {
    path: 'cashier/sales',
    component: ReportListComponent,
  },
  {
    path: 'cashier/manage-items',
    component: ManagePackageComponent,
  },{
    path: "authentication",
    component: AuthenticationComponent,
    children: [
      {path: "", redirectTo: "signin", pathMatch: 'full'},
      {path: "signin", component: SigninComponent},
      {path: "signup", component: SignupComponent},
    ]
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
