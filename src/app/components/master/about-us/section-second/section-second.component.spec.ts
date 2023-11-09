import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SectionSecondComponent } from './section-second.component';

describe('SectionSecondComponent', () => {
  let component: SectionSecondComponent;
  let fixture: ComponentFixture<SectionSecondComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionSecondComponent ],
      imports: []
    }).compileComponents();

    fixture = TestBed.createComponent(SectionSecondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
