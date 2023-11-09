import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PricesHistoricChartComponent } from './prices-historic-chart.component';

describe('PricesHistoricChartComponent', () => {
  let component: PricesHistoricChartComponent;
  let fixture: ComponentFixture<PricesHistoricChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PricesHistoricChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PricesHistoricChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
