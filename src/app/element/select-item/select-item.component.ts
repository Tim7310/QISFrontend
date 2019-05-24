import { 
  Component, 
  OnInit, 
  AfterViewInit, 
  OnDestroy, 
  ViewChild, 
  Output, 
  EventEmitter, 
  Input } 
from '@angular/core';
import { itemList } from 'src/app/services/service.interface';
import { FormControl } from '@angular/forms';
import { ReplaySubject, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { MatSelect } from '@angular/material';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'select-item',
  templateUrl: './select-item.component.html',
  styleUrls: ['./select-item.component.scss']
})
export class SelectItemComponent implements OnInit, AfterViewInit, OnDestroy {
  @Output() selectTrig = new EventEmitter();
  @Input() itemURL: string;
  @Input() placeholder: string;
  items = [];

  /** control for the selected bank */
  public itemCtrl: FormControl = new FormControl();

  /** control for the MatSelect filter keyword */
  public itemFilterCtrl: FormControl = new FormControl();

  /** list of item filtered by search keyword */
  public filteredItems: ReplaySubject<itemList[]> = new ReplaySubject<itemList[]>(1);

  @ViewChild('singleSelect') singleSelect: MatSelect;

  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();

  getSelectedValue(){
      this.selectTrig.emit(this.itemCtrl.value);
  }

  constructor(public itemService: ItemService) { }

  ngOnInit() {
    //get item list and pass the data to items variable
    this.itemService.getItem(this.itemURL)
    .subscribe(data => this.items = data);
    // set initial selection
    this.itemCtrl.setValue(this.items[10]);

    // load the initial bank list
    this.filteredItems.next(this.items.slice());

    // listen for search field value changes
    this.itemFilterCtrl.valueChanges
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
   * Sets the initial value after the filteredBanks are loaded initially
   */
  protected setInitialValue() {
    this.filteredItems
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        // setting the compareWith property to a comparison function
        // triggers initializing the selection according to the initial value of
        // the form control (i.e. _initializeSelection())
        // this needs to be done after the filteredBanks are loaded initially
        // and after the mat-option elements are available
        this.singleSelect.compareWith = 
        (a: itemList, b: itemList) => a && b && a.itemId === b.itemId;
      });
  }

  protected filterItems() {
    if (!this.items) {
      return;
    }
    // get the search keyword
    let search = this.itemFilterCtrl.value;
    if (!search) {
      this.filteredItems.next(this.items.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the items
    this.filteredItems.next(
      this.items.filter(item => item.itemName.toLowerCase().indexOf(search) > -1)
    );
  }

}
