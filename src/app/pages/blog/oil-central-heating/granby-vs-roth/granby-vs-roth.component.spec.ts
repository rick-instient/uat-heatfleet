import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GranbyVsRothComponent } from './granby-vs-roth.component';

describe('GranbyVsRothComponent', () => {
  let component: GranbyVsRothComponent;
  let fixture: ComponentFixture<GranbyVsRothComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GranbyVsRothComponent]
    });
    fixture = TestBed.createComponent(GranbyVsRothComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
