import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownTimeReportComponent } from './down-time-report.component';

describe('DownTimeReportComponent', () => {
  let component: DownTimeReportComponent;
  let fixture: ComponentFixture<DownTimeReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DownTimeReportComponent]
    });
    fixture = TestBed.createComponent(DownTimeReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
