import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OilPricesDeclinePageComponent } from './oil-prices-decline';

describe('OilPricesDeclinePageComponent', () => {
  let component: OilPricesDeclinePageComponent;
  let fixture: ComponentFixture<OilPricesDeclinePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OilPricesDeclinePageComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OilPricesDeclinePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
