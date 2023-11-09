import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OilTankGaugeComponent } from './oil-tank-gauge.component';

describe('OilTankGaugeComponent', () => {
  let component: OilTankGaugeComponent;
  let fixture: ComponentFixture<OilTankGaugeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OilTankGaugeComponent]
    });
    fixture = TestBed.createComponent(OilTankGaugeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
