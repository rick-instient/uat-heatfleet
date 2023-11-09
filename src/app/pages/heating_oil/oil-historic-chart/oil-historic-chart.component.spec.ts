import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OilHistoricChartComponent } from './oil-historic-chart.component';

describe('OilHistoricChartComponent', () => {
  let component: OilHistoricChartComponent;
  let fixture: ComponentFixture<OilHistoricChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OilHistoricChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OilHistoricChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
