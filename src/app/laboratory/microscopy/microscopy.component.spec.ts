import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MicroscopyComponent } from './microscopy.component';

describe('MicroscopyComponent', () => {
  let component: MicroscopyComponent;
  let fixture: ComponentFixture<MicroscopyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MicroscopyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MicroscopyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
