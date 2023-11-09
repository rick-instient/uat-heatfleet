import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SectionWhyComponent } from './section-why.component';

describe('SectionWhyComponent', () => {
  let component: SectionWhyComponent;
  let fixture: ComponentFixture<SectionWhyComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SectionWhyComponent],
      imports: [],
    }).compileComponents();

    fixture = TestBed.createComponent(SectionWhyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
