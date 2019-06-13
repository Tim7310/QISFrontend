import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeldTransactionComponent } from './held-transaction.component';

describe('HeldTransactionComponent', () => {
  let component: HeldTransactionComponent;
  let fixture: ComponentFixture<HeldTransactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeldTransactionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeldTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
