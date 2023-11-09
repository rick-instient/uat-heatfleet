import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SectionHowitworksComponent } from './section-howitworks.component';

describe('SectionHowitworksComponent', () => {
  let component: SectionHowitworksComponent;
  let fixture: ComponentFixture<SectionHowitworksComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SectionHowitworksComponent],
      imports: [],
    }).compileComponents();

    fixture = TestBed.createComponent(SectionHowitworksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
