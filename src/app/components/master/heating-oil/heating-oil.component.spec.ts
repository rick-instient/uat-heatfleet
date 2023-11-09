import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeatingOilComponent } from './heating-oil.component';

describe('HeatingOilComponent', () => {
  let component: HeatingOilComponent;
  let fixture: ComponentFixture<HeatingOilComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeatingOilComponent]
    });
    fixture = TestBed.createComponent(HeatingOilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
