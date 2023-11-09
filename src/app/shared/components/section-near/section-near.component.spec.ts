import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionNearComponent } from './section-near.component';

describe('SectionNearComponent', () => {
  let component: SectionNearComponent;
  let fixture: ComponentFixture<SectionNearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionNearComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionNearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
