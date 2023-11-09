import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuelOilTankInstallationDiagramComponent } from './fuel-oil-tank-installation-diagram.component';

describe('FuelOilTankInstallationDiagramComponent', () => {
  let component: FuelOilTankInstallationDiagramComponent;
  let fixture: ComponentFixture<FuelOilTankInstallationDiagramComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FuelOilTankInstallationDiagramComponent]
    });
    fixture = TestBed.createComponent(FuelOilTankInstallationDiagramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
