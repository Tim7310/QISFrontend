import { Component, OnInit, AfterViewInit, OnDestroy, Output, Input, EventEmitter, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ReplaySubject, Subject } from 'rxjs';
import { company } from 'src/app/services/service.interface';
import { MatSelect } from '@angular/material';
import { ItemService } from 'src/app/services/item.service';
import { takeUntil, take } from 'rxjs/operators';

@Component({
  selector: 'company-select',
  templateUrl: './company-select.component.html',
  styleUrls: ['./company-select.component.scss']
})
export class CompanySelectComponent implements OnInit, AfterViewInit, OnDestroy {

  @Output() selectTrig = new EventEmitter();
  @Input() companyURL: string;
  @Input() placeholder: string;
  @Input() selected: company;
  company = [];

  /** control for the selected bank */
  public companyCtrl: FormControl = new FormControl();

  /** control for the MatSelect filter keyword */
  public companyFilterCtrl: FormControl = new FormControl();

  /** list of item filtered by search keyword */
  public filteredCompany: ReplaySubject<company[]> = new ReplaySubject<company[]>(1);

  @ViewChild('singleSelect') singleSelect: MatSelect;

  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();

  getSelectedValue(){
      this.selectTrig.emit(this.companyCtrl.value);
  }

  constructor(public itemService: ItemService) { }

  ngOnInit() {
    //get item list and pass the data to items variable
    this.itemService.getCompany(this.companyURL)
    .subscribe(data => {
      this.company = data;
       // load the initial bank list
      this.filteredCompany.next(this.company.slice());
    });

    // set initial selection
    this.companyCtrl.setValue("a");
     
    // listen for search field value changes
    this.companyFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterItems();
      });
// emit value
    this.companyCtrl.valueChanges.subscribe(
      value => this.selectTrig.emit(value)
    );
  }

  ngAfterViewInit() {
    this.setInitialValue();
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  /**
   * Sets the initial value after the filteredBanks are loaded initially
   */
  protected setInitialValue() {
    this.filteredCompany
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        // setting the compareWith property to a comparison function
        // triggers initializing the selection according to the initial value of
        // the form control (i.e. _initializeSelection())
        // this needs to be done after the filteredBanks are loaded initially
        // and after the mat-option elements are available
        this.singleSelect.compareWith = 
        (a: company, b: company) => a && b && a.companyID === b.companyID;
      });
  }

  protected filterItems() {
    if (!this.company) {
      return;
    }
    // get the search keyword
    let search = this.companyFilterCtrl.value;
    if (!search) {
      this.filteredCompany.next(this.company.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the items
    this.filteredCompany.next(
      this.company.filter(company => company.nameCompany.toLowerCase().indexOf(search) > -1)
    );
  }


}
