import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivErrorComponent } from './priv-error.component';

describe('PrivErrorComponent', () => {
  let component: PrivErrorComponent;
  let fixture: ComponentFixture<PrivErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrivErrorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
