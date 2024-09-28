import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EscalatedIssuesComponent } from './escalated-issues.component';

describe('EscalatedIssuesComponent', () => {
  let component: EscalatedIssuesComponent;
  let fixture: ComponentFixture<EscalatedIssuesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EscalatedIssuesComponent]
    });
    fixture = TestBed.createComponent(EscalatedIssuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
