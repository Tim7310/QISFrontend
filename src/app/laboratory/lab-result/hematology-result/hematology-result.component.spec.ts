import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HematologyResultComponent } from './hematology-result.component';

describe('HematologyResultComponent', () => {
  let component: HematologyResultComponent;
  let fixture: ComponentFixture<HematologyResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HematologyResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HematologyResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
