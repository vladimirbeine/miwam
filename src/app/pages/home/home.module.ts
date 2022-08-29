import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';
import { SwiperModule } from 'swiper/angular';

import { HomePage } from './home.page';
import { TranslateModule } from '@ngx-translate/core';
import { LanguagePopoverComponent } from 'src/app/components/language-popover/language-popover.component';
import { HomeHeaderMoreSettingsPopoverComponent } from 'src/app/components/home-header-more-settings-popover/home-header-more-settings-popover.component';
import { SuperTabsModule } from '@ionic-super-tabs/angular';
import { DateAsAgoPipe } from 'src/app/pipes/date-as-ago.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    TranslateModule,
    SuperTabsModule,
    SwiperModule,
  ],
  declarations: [
    HomePage,
    LanguagePopoverComponent,
    HomeHeaderMoreSettingsPopoverComponent,
    DateAsAgoPipe
  ],
  providers: [
    DateAsAgoPipe
  ]
})
export class HomePageModule {}
