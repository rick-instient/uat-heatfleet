import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OilTankGuideComponent } from './oil-tank-guide.component';

describe('OilTankGuideComponent', () => {
  let component: OilTankGuideComponent;
  let fixture: ComponentFixture<OilTankGuideComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OilTankGuideComponent]
    });
    fixture = TestBed.createComponent(OilTankGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
