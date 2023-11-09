import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeatingOilLocationsComponent } from './heating-oil-locations.component';

describe('HeatingOilLocationsComponent', () => {
  let component: HeatingOilLocationsComponent;
  let fixture: ComponentFixture<HeatingOilLocationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeatingOilLocationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeatingOilLocationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
