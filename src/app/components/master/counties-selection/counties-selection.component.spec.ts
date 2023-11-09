import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountiesSelectionComponent } from './counties-selection.component';

describe('CountiesSelectionComponent', () => {
  let component: CountiesSelectionComponent;
  let fixture: ComponentFixture<CountiesSelectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CountiesSelectionComponent]
    });
    fixture = TestBed.createComponent(CountiesSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
