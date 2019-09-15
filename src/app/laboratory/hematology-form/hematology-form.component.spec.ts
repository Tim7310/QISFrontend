import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HematologyFormComponent } from './hematology-form.component';

describe('HematologyFormComponent', () => {
  let component: HematologyFormComponent;
  let fixture: ComponentFixture<HematologyFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HematologyFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HematologyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
