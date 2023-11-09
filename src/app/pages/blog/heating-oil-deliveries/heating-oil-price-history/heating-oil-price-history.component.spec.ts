import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeatingOilPriceHistoryComponent } from './heating-oil-price-history.component';

describe('HeatingOilPriceHistoryComponent', () => {
  let component: HeatingOilPriceHistoryComponent;
  let fixture: ComponentFixture<HeatingOilPriceHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeatingOilPriceHistoryComponent]
    });
    fixture = TestBed.createComponent(HeatingOilPriceHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
