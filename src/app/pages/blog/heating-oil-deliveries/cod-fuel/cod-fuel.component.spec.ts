import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodFuelComponent } from './cod-fuel.component';

describe('CodFuelComponent', () => {
  let component: CodFuelComponent;
  let fixture: ComponentFixture<CodFuelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CodFuelComponent]
    });
    fixture = TestBed.createComponent(CodFuelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
