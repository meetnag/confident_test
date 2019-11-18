import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OcHistoryComponent } from './oc-history.component';

describe('OcHistoryComponent', () => {
  let component: OcHistoryComponent;
  let fixture: ComponentFixture<OcHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OcHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
