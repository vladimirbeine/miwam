import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { HomeHeaderMoreSettingsPopoverComponent } from 'src/app/components/home-header-more-settings-popover/home-header-more-settings-popover.component';

import SwiperCore, { SwiperOptions, Autoplay, Keyboard, Pagination, Scrollbar, Zoom, EffectFlip } from 'swiper';

SwiperCore.use([Autoplay, Keyboard, Pagination, Scrollbar, Zoom, EffectFlip]);

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  mainSegment: string;

  config: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 0,
    navigation: true,
    pagination: { clickable: true },
    scrollbar: { draggable: true },
  };

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

  onSwiper(swiper) {
    console.log("Swiper data: ", swiper);
  }
  onSlideChange() {
    console.log('slide change');
  }

  doRefresh(event) {
    setTimeout(() => {
      event.target.complete();
    }, 500);
  }

}
