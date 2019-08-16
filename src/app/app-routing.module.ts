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
import { AuthGuard } from './services/auth.guard';
import { PrivErrorComponent } from './page/priv-error/priv-error.component';
import { RefundComponent } from './page/refund/refund.component';
import { PendingAccountComponent } from './element/pending-account/pending-account.component';
import { ManageUserComponent } from './admin/manage-user/manage-user.component';
import { BillingComponent } from './admin/billing/billing.component';
import { BillingPdfComponent } from './admin/element/billing-pdf/billing-pdf.component';
import { SoaListComponent } from './admin/soa-list/soa-list.component';
import { AccountPaymentComponent } from './admin/account-payment/account-payment.component';
import { MicroscopyComponent } from './laboratory/microscopy/microscopy.component';

const routes: Routes = [
  { path: 'print/:ids',
    outlet: 'print',
    component: ReceiptComponent,
    canActivate: [AuthGuard]
  },
  { path: 'print/:dates',
    outlet: 'salesReport',
    component: SalesPdfComponent,
    canActivate: [AuthGuard]
  },
  { path: 'print/:ids',
    outlet: 'billing',
    component: BillingPdfComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '', redirectTo: '/cashier/transact', pathMatch: 'full'
  },
  {
    path: 'cashier/transact',
    component: TransactionComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'cashier/transactions',
    component: TransactionListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'cashier/hmo',
    component: HMOListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'cashier/sales',
    component: ReportListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'cashier/manage-items',
    component: ManagePackageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'cashier/refund-exchange',
    component: RefundComponent,
    canActivate: [AuthGuard]
  }, 
  {
    path: "authentication",
    component: AuthenticationComponent,
    children: [
      {path: "", redirectTo: "signin", pathMatch: 'full'},
      {path: "signin", component: SigninComponent},
      {path: "signup", component: SignupComponent},
    ]
  },
  {
    path: 'authentication/pending',
    component: PendingAccountComponent,
  },
  {
    path: 'admin/manage-user',
    component: ManageUserComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/account-payment',
    component: AccountPaymentComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/billing',
    component: BillingComponent,
    canActivate: [AuthGuard]
  },{
    path: 'admin/billing/pdf',
    component: BillingPdfComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'laboratory/microscopy',
    component: MicroscopyComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "error/privilege", component: PrivErrorComponent
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
