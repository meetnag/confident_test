import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditOcComponent } from './add-edit-oc.component';

describe('AddEditOcComponent', () => {
  let component: AddEditOcComponent;
  let fixture: ComponentFixture<AddEditOcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditOcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditOcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
