import { Component, OnInit } from '@angular/core';
import { LoadingController, PopoverController } from '@ionic/angular';
import { HomeHeaderMoreSettingsPopoverComponent } from 'src/app/components/home-header-more-settings-popover/home-header-more-settings-popover.component';
import { SMS, SmsService } from 'src/app/services/sms.service';

import { SuperTabsConfig } from '@ionic-super-tabs/core';

import SwiperCore, { SwiperOptions, Autoplay, Keyboard, Pagination, Scrollbar, Zoom, Navigation, EffectFlip } from 'swiper';
import { CardDetailsComponent } from 'src/app/components/card-details/card-details.component';

SwiperCore.use([Autoplay, Keyboard, Navigation, Pagination, Scrollbar, Zoom, EffectFlip]);

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  
  allSMS: SMS[];

  stConfig: SuperTabsConfig = {
    avoidElements: true,
    maxDragAngle: 30,
    allowElementScroll: true,
  };

  swConfig: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 0,
    navigation: true,
    pagination: { clickable: true },
    scrollbar: { draggable: true },
    autoplay: true,
    loop: true,
  };

  constructor(
    private popover: PopoverController,
    private smsService: SmsService,
    private loadingCtlr: LoadingController
    ) { }

  async ngOnInit() {
    await this.smsService
      .getAllSMS()
      .subscribe(res => {
        this.allSMS = res;
    });
  }

  async openMoreSettings() {
    const popover = await this.popover.create({
      component: HomeHeaderMoreSettingsPopoverComponent
    });
    await popover.present();
  }

  async openCard(item: string) {
    const popover = await this.popover.create({
      component: CardDetailsComponent,
      cssClass: 'custom-popover',
      componentProps: {
        url: item,
        time: '4h'
      },
      translucent: true
    });
    await popover.present();
  }

  doRefresh(event) {
    setTimeout(() => {
      event.target.complete();
    }, 500);
  }

  async loadData(): Promise<any> {
    const loading = await this.loadingCtlr.create({
      message: "Loading data...",
    });
    await loading.present();

    this.smsService.getAllSMS().subscribe((res) => {
      this.allSMS = res;
      console.log("SMS data: ", this.allSMS)
      loading.dismiss();
    });
  }
    
  onSwiper(swiper) {
    console.log("Swiper data: ", swiper);
  }
  onSlideChange() {
    console.log('slide change');
  }

  showBanner() {
  }

  hideBanner() {
  }

  showInterstitial() {
  }

  showRewardVideo() {
  }


}
