import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MicroscopyFormComponent } from './microscopy-form.component';

describe('MicroscopyFormComponent', () => {
  let component: MicroscopyFormComponent;
  let fixture: ComponentFixture<MicroscopyFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MicroscopyFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MicroscopyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
