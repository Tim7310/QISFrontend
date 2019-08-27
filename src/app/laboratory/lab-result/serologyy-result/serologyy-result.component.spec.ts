import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SerologyyResultComponent } from './serologyy-result.component';

describe('SerologyyResultComponent', () => {
  let component: SerologyyResultComponent;
  let fixture: ComponentFixture<SerologyyResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SerologyyResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SerologyyResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
