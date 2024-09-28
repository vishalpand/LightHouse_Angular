import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkippedIssuesComponent } from './skipped-issues.component';

describe('SkippedIssuesComponent', () => {
  let component: SkippedIssuesComponent;
  let fixture: ComponentFixture<SkippedIssuesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SkippedIssuesComponent]
    });
    fixture = TestBed.createComponent(SkippedIssuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
