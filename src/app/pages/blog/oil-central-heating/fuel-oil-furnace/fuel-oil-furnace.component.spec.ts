import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuelOilFurnaceComponent } from './fuel-oil-furnace.component';

describe('FuelOilFurnaceComponent', () => {
  let component: FuelOilFurnaceComponent;
  let fixture: ComponentFixture<FuelOilFurnaceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FuelOilFurnaceComponent]
    });
    fixture = TestBed.createComponent(FuelOilFurnaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
