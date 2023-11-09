import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TownProfileComponent } from './town-profile.component';

describe('TownProfileComponent', () => {
  let component: TownProfileComponent;
  let fixture: ComponentFixture<TownProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TownProfileComponent]
    });
    fixture = TestBed.createComponent(TownProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
