import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomeHeaderMoreSettingsPopoverComponent } from './home-header-more-settings-popover.component';

describe('HomeHeaderMoreSettingsPopoverComponent', () => {
  let component: HomeHeaderMoreSettingsPopoverComponent;
  let fixture: ComponentFixture<HomeHeaderMoreSettingsPopoverComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeHeaderMoreSettingsPopoverComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeHeaderMoreSettingsPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
