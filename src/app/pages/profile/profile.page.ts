import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonModal, LoadingController, MenuController } from '@ionic/angular';
import { DateAsAgoPipe } from 'src/app/pipes/date-as-ago.pipe';
import { AuthService } from 'src/app/services/auth.service';
import { ProfileService } from 'src/app/services/profile.service';
import { SMS, SmsService } from 'src/app/services/sms.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  @ViewChild(IonModal) modal: IonModal;

  
  allSMS: SMS[]; 

  smsTitle: string;
  smsMessage: string;
  smsCategory: string;

  user: any = null;

  
  presentingElement = null;

  constructor(
    private authService: AuthService,
    private profileService: ProfileService,
    private router: Router,
    private loadingController: LoadingController,
    private smsService: SmsService,
    public dateAsAgo: DateAsAgoPipe,
    private menuController: MenuController
    ) {
    this.loadProfile();
    }

  ngOnInit() {
    this.smsService
      .getAllSMS()
      .subscribe(res => {
        this.allSMS = res;
    });
  }

  async loadProfile(): Promise<any> {
    const loading = await this.loadingController.create({
      message: "Loading Profile...",
    });
    await loading.present();

    this.profileService.getProfile().subscribe((res) => {
      this.user = res;
      console.log("Profile data: ", this.user)
      loading.dismiss();
    });
  }


  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('/tabs/home');
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  async confirm() {
    await this.smsService.addSMS(this.smsTitle, this.smsMessage, this.smsCategory).catch(e => {
      console.log("SMS data not submitted", e);
    })
    this.modal.dismiss();
  }

  toggleMenu() {
    this.menuController.toggle('profile');
  }

  onWillDismiss() {}

}
