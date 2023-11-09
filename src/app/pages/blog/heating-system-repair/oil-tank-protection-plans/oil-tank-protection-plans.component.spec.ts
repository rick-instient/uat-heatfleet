import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OilTankProtectionPlansComponent } from './oil-tank-protection-plans.component';

describe('OilTankProtectionPlansComponent', () => {
  let component: OilTankProtectionPlansComponent;
  let fixture: ComponentFixture<OilTankProtectionPlansComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OilTankProtectionPlansComponent]
    });
    fixture = TestBed.createComponent(OilTankProtectionPlansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
