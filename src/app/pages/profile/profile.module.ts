import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePageRoutingModule } from './profile-routing.module';

import { ProfilePage } from './profile.page';
import { DateAsAgoPipe } from 'src/app/pipes/date-as-ago.pipe';
import { Camera } from '@awesome-cordova-plugins/camera/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilePageRoutingModule
  ],
  declarations: [ProfilePage, DateAsAgoPipe],
  providers: [DateAsAgoPipe, Camera]
})
export class ProfilePageModule {}
