import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeatingOilPricesComponent } from './heating-oil-prices.component';

describe('HeatingOilPricesComponent', () => {
  let component: HeatingOilPricesComponent;
  let fixture: ComponentFixture<HeatingOilPricesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeatingOilPricesComponent]
    });
    fixture = TestBed.createComponent(HeatingOilPricesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
