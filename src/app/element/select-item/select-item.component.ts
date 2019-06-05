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
import { itemList, packList, itemGroup } from 'src/app/services/service.interface';
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
  items: itemGroup[] = [];

  /** control for the selected bank */
  public itemCtrl: FormControl = new FormControl();

  /** control for the MatSelect filter keyword */
  public itemFilterCtrl: FormControl = new FormControl();

  /** list of item filtered by search keyword */
  public filteredItems: ReplaySubject<itemGroup[]> = new ReplaySubject<itemGroup[]>(1);

  @ViewChild('singleSelect') singleSelect: MatSelect;

  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();

  getSelectedValue(){
      this.selectTrig.emit(this.itemCtrl.value);
  }

  constructor(public itemService: ItemService) { 
  }

  ngOnInit() {
    // listen for search field value changes
    // this.itemFilterCtrl.valueChanges
    //   .pipe(takeUntil(this._onDestroy))
    //   .subscribe(() => {
    //     this.filterItems();
    //   });

    //get item list and pass the data to items variable
    let _items;
    this.itemService.getItem(this.itemURL)
    .subscribe(
      data  => _items = data,
      err   => console.error(err),
      ()    => this.groupItem( _items, "Items" )
    );

    //get Package and convert to item format
    let pack: itemList =  {
      itemId          : "",
      itemName        : "",
      itemPrice       : 0,
      itemDescription : "",
      itemType        : "",
      deletedItem     : 0,
      neededTest      : 0,
      creationDate    : "",
      dateUpdate      : ""
    };
    let packs: itemList[] = [];
    let _packs: itemGroup = {
      name: "",
      items: []
    }
    this.itemService.getPackage("getPackage")
    .subscribe((data) => 
      data.forEach(function (value){
        pack.itemId          = value.packageName;
        pack.itemName        = value.packageName;
        pack.itemPrice       = value.packagePrice;
        pack.itemDescription = value.packageDescription;
        pack.itemType        = value.packageType;
        pack.deletedItem     = value.deletedPackage;
        pack.neededTest      = undefined;
        pack.creationDate    = value.creationDate;
        pack.dateUpdate      = value.dateUpdate;
        packs.push(pack);
     }),
     err => console.error(err),
     () => this.groupItem(packs, "Packages")
    );
    this.itemCtrl.valueChanges.subscribe(
      value => this.selectTrig.emit(value)
    );

     // load the initial bank list
   this.filteredItems.next(this.copyItemGroups(this.items));

   // listen for search field value changes
   this.itemFilterCtrl.valueChanges
     .pipe(takeUntil(this._onDestroy))
     .subscribe(() => {
       this.filterItemGroups();
    });
  }

  ngAfterViewInit() {
   
   
  }
  groupItem(packs, name){
    this.items.push({
      name: name,
      items: packs
    })
  }
  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
  
  protected filterItemGroups() {
    if (!this.items) {
      return;
    }
    // get the search keyword
    let search = this.itemFilterCtrl.value;
    const itemGroupsCopy = this.copyItemGroups(this.items);
    if (!search) {
      this.filteredItems.next(itemGroupsCopy);
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredItems.next(
      itemGroupsCopy.filter(data => {
        const showItemGroup = data.name.toLowerCase().indexOf(search) > -1;
        if (!showItemGroup) {
          data.items = data.items.filter(
          item => item.itemName.toLowerCase().indexOf(search) > -1);
         }
        return data.items.length > 0;
      })
    );
  }
  protected copyItemGroups(itemGroups: itemGroup[]) {
    const itemGroupsCopy = [];
    itemGroups.forEach(data => {
      itemGroupsCopy.push({
        name: data.name,
        items: data.items.slice()
      });
    });
    return itemGroupsCopy;
  }
}
