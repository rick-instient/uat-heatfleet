import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuelOilFurnaceAndBoilerSizesComponent } from './fuel-oil-furnace-and-boiler-sizes.component';

describe('FuelOilFurnaceAndBoilerSizesComponent', () => {
  let component: FuelOilFurnaceAndBoilerSizesComponent;
  let fixture: ComponentFixture<FuelOilFurnaceAndBoilerSizesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FuelOilFurnaceAndBoilerSizesComponent]
    });
    fixture = TestBed.createComponent(FuelOilFurnaceAndBoilerSizesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
