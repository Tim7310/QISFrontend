import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MicroscopyResultComponent } from './microscopy-result.component';

describe('MicroscopyResultComponent', () => {
  let component: MicroscopyResultComponent;
  let fixture: ComponentFixture<MicroscopyResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MicroscopyResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MicroscopyResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
