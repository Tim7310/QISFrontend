import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesPdfComponent } from './sales-pdf.component';

describe('SalesPdfComponent', () => {
  let component: SalesPdfComponent;
  let fixture: ComponentFixture<SalesPdfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesPdfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
