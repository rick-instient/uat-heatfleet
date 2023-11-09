import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StateProfileComponent } from './state-profile.component';

describe('StateProfileComponent', () => {
  let component: StateProfileComponent;
  let fixture: ComponentFixture<StateProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StateProfileComponent]
    });
    fixture = TestBed.createComponent(StateProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
