import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingPdfComponent } from './billing-pdf.component';

describe('BillingPdfComponent', () => {
  let component: BillingPdfComponent;
  let fixture: ComponentFixture<BillingPdfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillingPdfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillingPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
