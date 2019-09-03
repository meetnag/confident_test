import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditOcSrnoComponent } from './add-edit-oc-srno.component';

describe('AddEditOcSrnoComponent', () => {
  let component: AddEditOcSrnoComponent;
  let fixture: ComponentFixture<AddEditOcSrnoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditOcSrnoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditOcSrnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
