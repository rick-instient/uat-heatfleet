import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SectionImgComponent } from './section-img.component';

describe('SectionImgComponent', () => {
  let component: SectionImgComponent;
  let fixture: ComponentFixture<SectionImgComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionImgComponent ],
      imports: []
    }).compileComponents();

    fixture = TestBed.createComponent(SectionImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
