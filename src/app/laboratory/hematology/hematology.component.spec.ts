import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HematologyComponent } from './hematology.component';

describe('HematologyComponent', () => {
  let component: HematologyComponent;
  let fixture: ComponentFixture<HematologyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HematologyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HematologyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
