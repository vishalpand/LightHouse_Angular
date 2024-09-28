import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEscalationComponent } from './add-escalation.component';

describe('AddEscalationComponent', () => {
  let component: AddEscalationComponent;
  let fixture: ComponentFixture<AddEscalationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEscalationComponent]
    });
    fixture = TestBed.createComponent(AddEscalationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
