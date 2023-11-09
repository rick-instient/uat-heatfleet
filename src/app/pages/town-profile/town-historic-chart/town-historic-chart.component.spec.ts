import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TownHistoricChartComponent } from './town-historic-chart.component';

describe('TownHistoricChartComponent', () => {
  let component: TownHistoricChartComponent;
  let fixture: ComponentFixture<TownHistoricChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TownHistoricChartComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TownHistoricChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
