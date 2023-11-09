import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OilCompaniesComponent } from './oil-companies.component';

describe('OilCompaniesComponent', () => {
  let component: OilCompaniesComponent;
  let fixture: ComponentFixture<OilCompaniesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OilCompaniesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OilCompaniesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
