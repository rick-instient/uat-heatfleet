import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SectionComparepricesComponent } from './section-compareprices.component';

describe('SectionComparepricesComponent', () => {
  let component: SectionComparepricesComponent;
  let fixture: ComponentFixture<SectionComparepricesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SectionComparepricesComponent],
      imports: [],
    }).compileComponents();

    fixture = TestBed.createComponent(SectionComparepricesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
