import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChemistryResultComponent } from './chemistry-result.component';

describe('ChemistryResultComponent', () => {
  let component: ChemistryResultComponent;
  let fixture: ComponentFixture<ChemistryResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChemistryResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChemistryResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
