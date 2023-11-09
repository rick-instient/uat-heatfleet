import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OilTankReplacementComponent } from './oil-tank-replacement.component';

describe('OilTankReplacementComponent', () => {
  let component: OilTankReplacementComponent;
  let fixture: ComponentFixture<OilTankReplacementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OilTankReplacementComponent]
    });
    fixture = TestBed.createComponent(OilTankReplacementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
