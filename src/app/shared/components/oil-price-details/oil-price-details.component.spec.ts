import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OilPriceDetailsComponent } from './oil-price-details.component';

describe('OilPriceDetailsComponent', () => {
  let component: OilPriceDetailsComponent;
  let fixture: ComponentFixture<OilPriceDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OilPriceDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OilPriceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
