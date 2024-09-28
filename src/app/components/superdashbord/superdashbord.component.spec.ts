import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperdashbordComponent } from './superdashbord.component';

describe('SuperdashbordComponent', () => {
  let component: SuperdashbordComponent;
  let fixture: ComponentFixture<SuperdashbordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuperdashbordComponent]
    });
    fixture = TestBed.createComponent(SuperdashbordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
