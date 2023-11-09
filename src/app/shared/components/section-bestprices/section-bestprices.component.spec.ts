import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionBestpricesComponent } from './section-bestprices.component';

describe('SectionBestpricesComponent', () => {
  let component: SectionBestpricesComponent;
  let fixture: ComponentFixture<SectionBestpricesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SectionBestpricesComponent]
    });
    fixture = TestBed.createComponent(SectionBestpricesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
