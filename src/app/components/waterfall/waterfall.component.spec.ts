import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaterfallComponent } from './waterfall.component';

describe('WaterfallComponent', () => {
  let component: WaterfallComponent;
  let fixture: ComponentFixture<WaterfallComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WaterfallComponent]
    });
    fixture = TestBed.createComponent(WaterfallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
