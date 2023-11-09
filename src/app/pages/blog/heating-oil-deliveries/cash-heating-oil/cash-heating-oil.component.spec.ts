import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashHeatingOilComponent } from './cash-heating-oil.component';

describe('CashHeatingOilComponent', () => {
  let component: CashHeatingOilComponent;
  let fixture: ComponentFixture<CashHeatingOilComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CashHeatingOilComponent]
    });
    fixture = TestBed.createComponent(CashHeatingOilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
