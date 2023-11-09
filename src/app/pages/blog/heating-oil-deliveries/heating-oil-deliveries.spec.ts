import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HeatingOilDeliveriesPageComponent } from './heating-oil-deliveries';

describe('HeatingOilDeliveriesPageComponent', () => {
  let component: HeatingOilDeliveriesPageComponent;
  let fixture: ComponentFixture<HeatingOilDeliveriesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeatingOilDeliveriesPageComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HeatingOilDeliveriesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
