import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditHMOComponent } from './edit-hmo.component';

describe('EditHMOComponent', () => {
  let component: EditHMOComponent;
  let fixture: ComponentFixture<EditHMOComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditHMOComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditHMOComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
