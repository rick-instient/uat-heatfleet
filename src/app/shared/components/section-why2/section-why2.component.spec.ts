import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SectionWhy2Component } from './section-why2.component';

describe('SectionWhy2Component', () => {
  let component: SectionWhy2Component;
  let fixture: ComponentFixture<SectionWhy2Component>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SectionWhy2Component],
      imports: [],
    }).compileComponents();

    fixture = TestBed.createComponent(SectionWhy2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
