import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SpotlightPageRoutingModule } from './spotlight-routing.module';

import { SpotlightPage } from './spotlight.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SpotlightPageRoutingModule
  ],
  declarations: [SpotlightPage]
})
export class SpotlightPageModule {}
