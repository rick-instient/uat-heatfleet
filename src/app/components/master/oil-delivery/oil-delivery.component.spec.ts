import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OilDeliveryComponent } from './oil-delivery.component';

describe('OilDeliveryComponent', () => {
  let component: OilDeliveryComponent;
  let fixture: ComponentFixture<OilDeliveryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OilDeliveryComponent]
    });
    fixture = TestBed.createComponent(OilDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
