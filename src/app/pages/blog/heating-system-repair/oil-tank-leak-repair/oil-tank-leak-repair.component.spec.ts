import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OilTankLeakRepairComponent } from './oil-tank-leak-repair.component';

describe('OilTankLeakRepairComponent', () => {
  let component: OilTankLeakRepairComponent;
  let fixture: ComponentFixture<OilTankLeakRepairComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OilTankLeakRepairComponent]
    });
    fixture = TestBed.createComponent(OilTankLeakRepairComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
