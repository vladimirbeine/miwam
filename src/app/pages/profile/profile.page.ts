import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonModal, LoadingController, MenuController, ModalController } from '@ionic/angular';
import { InsightsComponent } from 'src/app/components/modals/insights/insights.component';
import { UpdateProfileComponent } from 'src/app/components/modals/update-profile/update-profile.component';
import { DateAsAgoPipe } from 'src/app/pipes/date-as-ago.pipe';
import { AuthService } from 'src/app/services/auth.service';
import { ProfileService } from 'src/app/services/profile.service';
import { QuotesService } from 'src/app/services/quotes.service';
import { SMS, SmsService } from 'src/app/services/sms.service';


import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

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
    private loadingContlr: LoadingController,
    private alertCtlr: AlertController,
    private smsService: SmsService,
    public dateAsAgo: DateAsAgoPipe,
    private menuController: MenuController,
    private quoteService: QuotesService,
    private modalCtrlr: ModalController
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
    const loading = await this.loadingContlr.create({
      message: "Loading Profile...",
    });
    await loading.present();

    this.profileService.getProfile().subscribe((res) => {
      this.user = res;
      console.log("Profile data: ", this.user)
      loading.dismiss();
    });
  }

  async changeImage() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Photos, //Camera, Photos or Prompt
    });
    console.log("Image file: ", image);

    if (image) {
      const loading = await this.loadingContlr.create();
      await loading.present();

      const result = await this.quoteService.uploadProfilePicture(image);
      loading.dismiss();

      if (!result) {
        const alert = await this.alertCtlr.create({
          header: 'Upload failed',
          message: 'There was an eror uploading the avatar',
          buttons: ['Ok']
        });
        await alert.present();
        console.log("Error message: ", image);
      }
    }
  }

  // async uploadAQuote() {
  //   const image = await this.camera.getPicture({
  //     quality: 100,
  //     destinationType: this.camera.DestinationType.FILE_URI,
  //     encodingType: this.camera.EncodingType.JPEG,
  //     sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
  //     mediaType: this.camera.MediaType.PICTURE
  //   }).then(async (imdData) => {

  //   if (imdData) {
  //     const loading = await this.loadingController.create();
  //     await loading.present();

  //     const result = await this.quoteService.uploadProfilePicture(imdData);

  //     loading.dismiss();

  //     if (!result) {
  //       const alert = await this.alertCtlr.create({
  //         header: 'Upload failed',
  //         message: imdData,
  //         buttons: ['Ok']
  //       });
  //       await alert.present();
  //     }
  //   }
  //   });
  //   console.log("Image file: ", image);
  // }



  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('/tabs/home');
  }

  cancel() {
    this.modal.dismiss();
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

  async updateProfileModal() {
    const modal = await this.modalCtrlr.create({
      component: UpdateProfileComponent,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
    }
  }

  async insightsModal() {
    const modal = await this.modalCtrlr.create({
      component: InsightsComponent,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
    }
  }

}
