import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OilTankChartComponent } from './oil-tank-chart.component';

describe('OilTankChartComponent', () => {
  let component: OilTankChartComponent;
  let fixture: ComponentFixture<OilTankChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OilTankChartComponent]
    });
    fixture = TestBed.createComponent(OilTankChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
