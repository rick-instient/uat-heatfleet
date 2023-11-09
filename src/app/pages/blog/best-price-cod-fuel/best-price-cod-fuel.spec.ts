import { async, ComponentFixture, TestBed } from '@angular/core/testing';


import { BestPriceCodFuelPageComponent } from './best-price-cod-fuel';

describe('BestPriceCodFuelPageComponent', () => {
  let component: BestPriceCodFuelPageComponent;
  let fixture: ComponentFixture<BestPriceCodFuelPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BestPriceCodFuelPageComponent ],
     
    }).compileComponents();

    fixture = TestBed.createComponent(BestPriceCodFuelPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
