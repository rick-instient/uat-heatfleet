import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HeatingSystemRepairPageComponent } from './heating-system-repair';

describe('HeatingSystemRepairPageComponent', () => {
  let component: HeatingSystemRepairPageComponent;
  let fixture: ComponentFixture<HeatingSystemRepairPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeatingSystemRepairPageComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HeatingSystemRepairPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
