import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OilCompanyGuideComponent } from './oil-company-guide.component';

describe('OilCompanyGuideComponent', () => {
  let component: OilCompanyGuideComponent;
  let fixture: ComponentFixture<OilCompanyGuideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OilCompanyGuideComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OilCompanyGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
