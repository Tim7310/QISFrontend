import { 
  Component, 
  OnInit, 
  AfterViewInit, 
  OnDestroy, 
  Output, 
  EventEmitter, 
  Input, 
  ViewChild } 
from '@angular/core';
import { FormControl } from '@angular/forms';
import { ReplaySubject, Subject } from 'rxjs';
import { patient } from 'src/app/services/service.interface';
import { MatSelect } from '@angular/material';
import { PatientService } from 'src/app/services/patient.service';
import { takeUntil, take } from 'rxjs/operators';

@Component({
  selector: 'select-patient',
  templateUrl: './select-patient.component.html',
  styleUrls: ['./select-patient.component.scss']
})
export class SelectPatientComponent implements OnInit, AfterViewInit, OnDestroy {
  @Output() selectTrig = new EventEmitter();
  @Input() patientURL: string;
  @Input() placeholder: string;
  patient = [];

  /** control for the selected bank */
  public patientCtrl: FormControl = new FormControl();

  /** control for the MatSelect filter keyword */
  public patientFilterCtrl: FormControl = new FormControl();

  /** list of patient filtered by search keyword */
  public filteredPatient: ReplaySubject<patient[]> = new ReplaySubject<patient[]>(1);

  @ViewChild('singleSelect') singleSelect: MatSelect;

  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();

  getSelectedValue(){
      this.selectTrig.emit(this.patientCtrl.value);
  }

  constructor(public patientService: PatientService) { }

  ngOnInit() {
    //get patient list and pass the data to patient variable
    this.patientService.getPatient(this.patientURL)
    .subscribe(data => this.patient= data);
    // set initial selection
    this.patientCtrl.setValue(this.patient[10]);

    // load the initial patient list
    this.filteredPatient.next(this.patient.slice());

    // listen for search field value changes
    this.patientFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterItems();
      });
  }

  ngAfterViewInit() {
    this.setInitialValue();
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  /**
   * Sets the initial value after the filteredPatient are loaded initially
   */
  protected setInitialValue() {
    this.filteredPatient
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        this.singleSelect.compareWith = 
        (a: patient, b: patient) => a && b && a.patientID === b.patientID;
      });
  }

  protected filterItems() {
    if (!this.patient) {
      return;
    }
    // get the search keyword
    let search = this.patientFilterCtrl.value;
    if (!search) {
      this.filteredPatient.next(this.patient.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the patient
    this.filteredPatient.next(
      this.patient.filter(patient => patient.fullName.toLowerCase().indexOf(search) > -1 )
    );
  }

}
