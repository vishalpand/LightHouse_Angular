import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppOnbordingComponent } from './app-onbording.component';

describe('AppOnbordingComponent', () => {
  let component: AppOnbordingComponent;
  let fixture: ComponentFixture<AppOnbordingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppOnbordingComponent]
    });
    fixture = TestBed.createComponent(AppOnbordingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
