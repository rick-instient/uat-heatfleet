import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OilCompaniesComponent } from './oil-companies.component';

describe('OilCompaniesComponent', () => {
  let component: OilCompaniesComponent;
  let fixture: ComponentFixture<OilCompaniesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OilCompaniesComponent]
    });
    fixture = TestBed.createComponent(OilCompaniesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
