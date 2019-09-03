import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOcComponent } from './view-oc.component';

describe('ViewOcComponent', () => {
  let component: ViewOcComponent;
  let fixture: ComponentFixture<ViewOcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewOcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewOcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
