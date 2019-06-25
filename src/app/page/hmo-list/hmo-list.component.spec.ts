import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HMOListComponent } from './hmo-list.component';

describe('HMOListComponent', () => {
  let component: HMOListComponent;
  let fixture: ComponentFixture<HMOListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HMOListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HMOListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
