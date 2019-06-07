import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReceiptComponent } from './element/receipt/receipt.component';

const routes: Routes = [
  { path: 'print/:ids',
    outlet: 'print',
    component: ReceiptComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
