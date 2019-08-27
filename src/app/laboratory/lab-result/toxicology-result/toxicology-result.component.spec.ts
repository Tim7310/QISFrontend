import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToxicologyResultComponent } from './toxicology-result.component';

describe('ToxicologyResultComponent', () => {
  let component: ToxicologyResultComponent;
  let fixture: ComponentFixture<ToxicologyResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToxicologyResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToxicologyResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
