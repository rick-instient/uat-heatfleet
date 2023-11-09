import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuelComparisonComponent } from './fuel-comparison.component';

describe('FuelComparisonComponent', () => {
  let component: FuelComparisonComponent;
  let fixture: ComponentFixture<FuelComparisonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FuelComparisonComponent]
    });
    fixture = TestBed.createComponent(FuelComparisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
