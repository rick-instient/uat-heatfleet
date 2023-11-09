import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FurnaceRepairComponent } from './furnace-repair.component';

describe('FurnaceRepairComponent', () => {
  let component: FurnaceRepairComponent;
  let fixture: ComponentFixture<FurnaceRepairComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FurnaceRepairComponent],
    });
    fixture = TestBed.createComponent(FurnaceRepairComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
