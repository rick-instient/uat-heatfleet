import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuelOilFurnaceAndBoilerBrandsComponent } from './fuel-oil-furnace-and-boiler-brands.component';

describe('FuelOilFurnaceAndBoilerBrandsComponent', () => {
  let component: FuelOilFurnaceAndBoilerBrandsComponent;
  let fixture: ComponentFixture<FuelOilFurnaceAndBoilerBrandsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FuelOilFurnaceAndBoilerBrandsComponent]
    });
    fixture = TestBed.createComponent(FuelOilFurnaceAndBoilerBrandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
