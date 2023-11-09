import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BestPriceComponent } from './best-price.component';

describe('BestPriceComponent', () => {
  let component: BestPriceComponent;
  let fixture: ComponentFixture<BestPriceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BestPriceComponent]
    });
    fixture = TestBed.createComponent(BestPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
