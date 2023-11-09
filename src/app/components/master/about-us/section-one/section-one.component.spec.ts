import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SectionOneComponent } from './section-one.component';

describe('SectionOneComponent', () => {
  let component: SectionOneComponent;
  let fixture: ComponentFixture<SectionOneComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionOneComponent ],
      imports: []
    }).compileComponents();

    fixture = TestBed.createComponent(SectionOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
