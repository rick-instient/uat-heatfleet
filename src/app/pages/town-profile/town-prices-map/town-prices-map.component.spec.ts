import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TownPricesMapComponent } from './town-prices-map.component';

describe('TownPricesMapComponent', () => {
  let component: TownPricesMapComponent;
  let fixture: ComponentFixture<TownPricesMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TownPricesMapComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TownPricesMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
