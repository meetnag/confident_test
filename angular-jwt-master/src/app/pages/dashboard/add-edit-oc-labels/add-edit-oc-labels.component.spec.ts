import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditOcLabelsComponent } from './add-edit-oc-labels.component';

describe('AddEditOcLabelsComponent', () => {
  let component: AddEditOcLabelsComponent;
  let fixture: ComponentFixture<AddEditOcLabelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditOcLabelsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditOcLabelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
