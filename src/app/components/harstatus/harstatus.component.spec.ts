import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HarstatusComponent } from './harstatus.component';

describe('HarstatusComponent', () => {
  let component: HarstatusComponent;
  let fixture: ComponentFixture<HarstatusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HarstatusComponent]
    });
    fixture = TestBed.createComponent(HarstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
