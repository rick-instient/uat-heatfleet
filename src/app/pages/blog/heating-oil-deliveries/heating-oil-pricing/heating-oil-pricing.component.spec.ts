import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeatingOilPricingComponent } from './heating-oil-pricing.component';

describe('HeatingOilPricingComponent', () => {
  let component: HeatingOilPricingComponent;
  let fixture: ComponentFixture<HeatingOilPricingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeatingOilPricingComponent]
    });
    fixture = TestBed.createComponent(HeatingOilPricingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
