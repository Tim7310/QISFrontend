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
import { MatDialogRef} from '@angular/material/dialog';
import { TransactionListComponent } from './element/transaction-list/transaction-list.component';
import { LoadingComponent } from './element/loading/loading.component';
import { EditHMOComponent } from './element/edit-hmo/edit-hmo.component';
import { ErrorPageComponent } from './page/error-page/error-page.component';
import { HMOListComponent } from './page/hmo-list/hmo-list.component';
import { ReportListComponent } from './page/report-list/report-list.component';
import { UserService } from './services/user.service';
import { ItemListComponent } from './element/item-list/item-list.component';
import { ManagePackageComponent } from './page/manage-package/manage-package.component';
import { CreateItemComponent } from './element/create-item/create-item.component';
import { PackageListComponent } from './element/package-list/package-list.component';
import { CreatePackageComponent } from './element/create-package/create-package.component';
import { SalesPdfComponent } from './element/sales-pdf/sales-pdf.component';
import { DateTimePickerModule } from "@syncfusion/ej2-angular-calendars";
import { AuthenticationComponent } from './page/authentication/authentication.component';
import { SigninComponent } from './element/signin/signin.component';
import { SignupComponent } from './element/signup/signup.component';
import { PrivErrorComponent } from './page/priv-error/priv-error.component';
import { RefundComponent } from './page/refund/refund.component';
import { PendingAccountComponent } from './element/pending-account/pending-account.component';
import { ManageUserComponent } from './admin/manage-user/manage-user.component';
import { UserListComponent } from './admin/element/user-list/user-list.component';
import { UserFormComponent } from './admin/element/user-form/user-form.component';
import { UserAccessComponent } from './admin/element/user-access/user-access.component';
import { AccountPaymentComponent } from './admin/account-payment/account-payment.component';
import { BillingComponent } from './admin/billing/billing.component';
import { BillingPdfComponent } from './admin/element/billing-pdf/billing-pdf.component';
import { SoaListComponent } from './admin/soa-list/soa-list.component';
import { DatePipe } from '@angular/common';
import { PaymentComponent } from './admin/element/payment/payment.component';
import { MicroscopyComponent } from './laboratory/microscopy/microscopy.component';
import { MicroscopyFormComponent } from './laboratory/microscopy-form/microscopy-form.component';
import { PatientInfoComponent } from './laboratory/patient-info/patient-info.component';
import { LabResultComponent } from './laboratory/lab-result/lab-result.component';
import { MicroscopyResultComponent } from './laboratory/lab-result/microscopy-result/microscopy-result.component';
import { HematologyResultComponent } from './laboratory/lab-result/hematology-result/hematology-result.component';
import { ChemistryResultComponent } from './laboratory/lab-result/chemistry-result/chemistry-result.component';
import { SerologyyResultComponent } from './laboratory/lab-result/serologyy-result/serologyy-result.component';
import { ToxicologyResultComponent } from './laboratory/lab-result/toxicology-result/toxicology-result.component';
import { LabHeaderComponent } from './laboratory/lab-result/lab-header/lab-header.component';
import { LabFooterComponent } from './laboratory/lab-result/lab-footer/lab-footer.component';
import { HematologyComponent } from './laboratory/hematology/hematology.component';
import { HematologyFormComponent } from './laboratory/hematology-form/hematology-form.component';
import { ChemistryComponent } from './laboratory/chemistry/chemistry.component';
import { ChemistryFormComponent } from './laboratory/chemistry-form/chemistry-form.component';


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
    TransactionListComponent,
    LoadingComponent,
    EditHMOComponent,
    ErrorPageComponent,
    HMOListComponent,
    ReportListComponent,
    ItemListComponent,
    ManagePackageComponent,
    CreateItemComponent,
    PackageListComponent,
    CreatePackageComponent,
    SalesPdfComponent,
    AuthenticationComponent,
    SigninComponent,
    SignupComponent,
    PrivErrorComponent,
    RefundComponent,
    PendingAccountComponent,
    ManageUserComponent,
    UserListComponent,
    UserFormComponent,
    UserAccessComponent,
    AccountPaymentComponent,
    BillingComponent,
    BillingPdfComponent,
    SoaListComponent,
    PaymentComponent,
    MicroscopyComponent,
    MicroscopyFormComponent,
    PatientInfoComponent,
    LabResultComponent,
    MicroscopyResultComponent,
    HematologyResultComponent,
    ChemistryResultComponent,
    SerologyyResultComponent,
    ToxicologyResultComponent,
    LabHeaderComponent,
    LabFooterComponent,
    HematologyComponent,
    HematologyFormComponent,
    ChemistryComponent,
    ChemistryFormComponent,
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
    MomentModule,
    DateTimePickerModule
  ],
  providers: [
    DatePipe,
    ItemService, 
    ErrorService,
    PatientService,
    UserService,
    Global,
    HeldTransactionComponent,
    {provide: MatDialogRef,useValue:{}},
    PatientFormComponent,
    {provide:MAT_DIALOG_DATA,useValue:{}},
    EditHMOComponent,
    {provide:MAT_DIALOG_DATA,useValue:{}},
    CreateItemComponent,
    {provide:MAT_DIALOG_DATA,useValue:{}},
    CreatePackageComponent,
    {provide:MAT_DIALOG_DATA,useValue:{}},
    UserAccessComponent,
    {provide:MAT_DIALOG_DATA,useValue:{}},
    SoaListComponent,
    {provide:MAT_DIALOG_DATA,useValue:{}},
    PaymentComponent,
    {provide:MAT_DIALOG_DATA,useValue:{}},
    ],
  bootstrap: [AppComponent],
  entryComponents: [
    UserAccessComponent,
    PatientFormComponent,
    ConfirmComponent,
    CompanyFormComponent,
    HeldTransactionComponent,
    EditHMOComponent,
    CreateItemComponent,
    CreatePackageComponent,
    SoaListComponent,
    PaymentComponent
    
  ]
})
export class AppModule { }
