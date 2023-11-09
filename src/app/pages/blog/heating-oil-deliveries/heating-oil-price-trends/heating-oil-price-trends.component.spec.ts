import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeatingOilPriceTrendsComponent } from './heating-oil-price-trends.component';

describe('HeatingOilPriceTrendsComponent', () => {
  let component: HeatingOilPriceTrendsComponent;
  let fixture: ComponentFixture<HeatingOilPriceTrendsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeatingOilPriceTrendsComponent]
    });
    fixture = TestBed.createComponent(HeatingOilPriceTrendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
