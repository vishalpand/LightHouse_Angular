import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRaisedEscaltionComponent } from './add-raised-escaltion.component';

describe('AddRaisedEscaltionComponent', () => {
  let component: AddRaisedEscaltionComponent;
  let fixture: ComponentFixture<AddRaisedEscaltionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddRaisedEscaltionComponent]
    });
    fixture = TestBed.createComponent(AddRaisedEscaltionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
