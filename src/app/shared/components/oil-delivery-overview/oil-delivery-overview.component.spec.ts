import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OilDeliveryOverviewComponent } from './oil-delivery-overview.component';

describe('OilDeliveryOverviewComponent', () => {
  let component: OilDeliveryOverviewComponent;
  let fixture: ComponentFixture<OilDeliveryOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OilDeliveryOverviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OilDeliveryOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
