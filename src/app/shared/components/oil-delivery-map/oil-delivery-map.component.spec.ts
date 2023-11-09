import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OilDeliveryMapComponent } from './oil-delivery-map.component';

describe('OilDeliveryMapComponent', () => {
  let component: OilDeliveryMapComponent;
  let fixture: ComponentFixture<OilDeliveryMapComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OilDeliveryMapComponent]
    });
    fixture = TestBed.createComponent(OilDeliveryMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
