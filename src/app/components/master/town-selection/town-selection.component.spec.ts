import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TownSelectionComponent } from './town-selection.component';

describe('TownSelectionComponent', () => {
  let component: TownSelectionComponent;
  let fixture: ComponentFixture<TownSelectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TownSelectionComponent]
    });
    fixture = TestBed.createComponent(TownSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
