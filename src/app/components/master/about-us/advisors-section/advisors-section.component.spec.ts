import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';;

import { AdvisorsSectionComponent } from './advisors-section.component';

describe('AdvisorsSectionComponent', () => {
  let component: AdvisorsSectionComponent;
  let fixture: ComponentFixture<AdvisorsSectionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvisorsSectionComponent ],
      imports: []
    }).compileComponents();

    fixture = TestBed.createComponent(AdvisorsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
