import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';


import { SectionThirdComponent } from './section-third.component';

describe('SectionThirdComponent', () => {
  let component: SectionThirdComponent;
  let fixture: ComponentFixture<SectionThirdComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionThirdComponent ],
      imports: []
    }).compileComponents();

    fixture = TestBed.createComponent(SectionThirdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
