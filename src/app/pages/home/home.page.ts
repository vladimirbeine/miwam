import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { HomeHeaderMoreSettingsPopoverComponent } from 'src/app/components/home-header-more-settings-popover/home-header-more-settings-popover.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  mainSegment: string;

  constructor(private popover: PopoverController) { }

  ngOnInit() {
    this.mainSegment = 'quotes';
  }

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }

  async openMoreSettings() {
    const popover = await this.popover.create({
      component: HomeHeaderMoreSettingsPopoverComponent
    });
    await popover.present();
  }

}
