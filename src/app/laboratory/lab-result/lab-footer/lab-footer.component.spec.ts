import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabFooterComponent } from './lab-footer.component';

describe('LabFooterComponent', () => {
  let component: LabFooterComponent;
  let fixture: ComponentFixture<LabFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
