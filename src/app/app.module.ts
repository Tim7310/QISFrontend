import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { ClarityModule } from '@clr/angular';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MAT_DIALOG_DATA,
} from '@angular/material';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {FlexLayoutModule} from '@angular/flex-layout';
import { CdkTableModule } from '@angular/cdk/table';
import { SelectItemComponent } from './element/select-item/select-item.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { ItemService } from './services/item.service';
import { ErrorService } from './services/error.service';
import { TransactionComponent } from './page/transaction/transaction.component';
import { ItemBoxComponent } from './element/item-box/item-box.component';
import { Global } from './global.variable';
import { SelectPatientComponent } from './element/select-patient/select-patient.component';
import { PatientService } from './services/patient.service';
import { PatientFormComponent } from './element/patient-form/patient-form.component';
import { CompanySelectComponent } from './element/company-select/company-select.component';
import { ConfirmComponent } from './element/confirm/confirm.component';
import { CompanyFormComponent } from './element/company-form/company-form.component';
import { ReceiptComponent } from './element/receipt/receipt.component';
import {NgxPrintModule} from 'ngx-print';
import { ClickOutsideModule } from 'ng-click-outside';
import { MomentModule } from 'ngx-moment';
import { HeldTransactionComponent } from './element/held-transaction/held-transaction.component';

@NgModule({
  declarations: [
    AppComponent,
    SelectItemComponent,
    TransactionComponent,
    ItemBoxComponent,
    SelectPatientComponent,
    PatientFormComponent,
    CompanySelectComponent,
    ConfirmComponent,
    CompanyFormComponent,
    ReceiptComponent,
    HeldTransactionComponent,
  ],
  exports: [
    CdkTableModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    FlexLayoutModule
  ],
  imports: [
    ClarityModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    CdkTableModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    FlexLayoutModule,
    NgxMatSelectSearchModule,
    NgxPrintModule,
    ClickOutsideModule,
    MomentModule
  ],
  providers: [
    ItemService, 
    ErrorService,
    PatientService,
    Global,
    PatientFormComponent,
    {provide:MAT_DIALOG_DATA,useValue:{}}
    ],
  bootstrap: [AppComponent],
  entryComponents: [
    PatientFormComponent,
    ConfirmComponent,
    CompanyFormComponent
  ]
})
export class AppModule { }
