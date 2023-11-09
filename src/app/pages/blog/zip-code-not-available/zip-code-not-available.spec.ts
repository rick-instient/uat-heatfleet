import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ZipCodeNotAvailablePageComponent } from './zip-code-not-available';

describe('ZipCodeNotAvailablePageComponent', () => {
  let component: ZipCodeNotAvailablePageComponent;
  let fixture: ComponentFixture<ZipCodeNotAvailablePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZipCodeNotAvailablePageComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ZipCodeNotAvailablePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
