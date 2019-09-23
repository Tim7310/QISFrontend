import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChemistryFormComponent } from './chemistry-form.component';

describe('ChemistryFormComponent', () => {
  let component: ChemistryFormComponent;
  let fixture: ComponentFixture<ChemistryFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChemistryFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChemistryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
