import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonModal, LoadingController, MenuController, ModalController } from '@ionic/angular';
import { InsightsComponent } from 'src/app/components/modals/insights/insights.component';
import { UpdateProfileComponent } from 'src/app/components/modals/update-profile/update-profile.component';
import { DateAsAgoPipe } from 'src/app/pipes/date-as-ago.pipe';
import { AuthService } from 'src/app/services/auth.service';
import { ProfileService } from 'src/app/services/profile.service';
import { SMS, SmsService } from 'src/app/services/sms.service';

import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';


import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Auth } from '@angular/fire/auth';
import { StatusService } from 'src/app/services/status.service';
import { ToastService } from 'src/app/services/controllers/toast.service';
import { QuoteUpload } from 'src/app/interfaces/quotes';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  @ViewChild(IonModal) modal: IonModal;
  
  allStatuses: SMS[]; 

  statusTitle: string;
  statusMessage: string;
  statusCategory: string;

  user: any = null;

  presentingElement = null;

  /////////////////////////////////////

  ngFireUploadTask: AngularFireUploadTask;

  progressNum: Observable<number>;

  progressSnapshot: Observable<any>;

  fileUploadedPath: Observable<string>;

  files: Observable<QuoteUpload[]>;

  FileName: string;
  FileSize: number;

  isImgUploading: boolean;
  isImgUploaded: boolean;
  
  private ngFirestoreCollection: AngularFirestoreCollection<QuoteUpload>;

  ////////////////////////////////////

  constructor(
    private authService: AuthService,
    private profileService: ProfileService,
    private router: Router,
    private loadingContlr: LoadingController,
    private alertCtlr: AlertController,
    private statusService: StatusService,
    public dateAsAgo: DateAsAgoPipe,
    private menuController: MenuController,
    private modalCtlr: ModalController,
    private toastCtlr: ToastService,
    private auth: Auth,
    private angularFirestore: AngularFirestore,
    private angularFireStorage: AngularFireStorage
    ) {
    this.loadProfile();
    
    this.isImgUploading = false;
    this.isImgUploaded = false;
    
    this.ngFirestoreCollection = angularFirestore.collection<QuoteUpload>(`users/${this.auth.currentUser.uid}/quotes-images`);
    this.files = this.ngFirestoreCollection.valueChanges();
    }

  ngOnInit() {
    this.statusService
      .getAllStatuses()
      .subscribe(res => {
        this.allStatuses = res;
    });

    
    console.log("UID: ", this.auth.currentUser.uid)
  }

  async loadProfile(): Promise<any> {
    const loading = await this.loadingContlr.create({
      message: "Loading Profile...",
    });
    await loading.present();

    this.profileService.getProfile(this.auth.currentUser.uid).subscribe((res) => {
      this.user = res;
      console.log("Profile data: ", this.user)
      loading.dismiss();
    });
  }

  async changeProfilePicture() {
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

      const result = await this.profileService.updateProfileAvatar(image);
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

  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('/tabs/home');
  }

  cancel() {
    this.modal.dismiss();
  }

  async addStatus() {
    await this.statusService.addStatus(this.statusTitle, this.statusMessage, this.statusCategory).then(() => {
      const message: string = "Profil modfie avec succes!"
      this.toastCtlr.default(message);
      this.modalCtlr.dismiss();
    }).catch(e => {
      const message: string = "Votre profil n'a pas ete modifie!"
      this.toastCtlr.error(message);
    });
    this.modalCtlr.dismiss();
  }

  toggleMenu() {
    this.menuController.toggle('profile');
  }

  async updateProfileModal() {
    const modal = await this.modalCtlr.create({
      component: UpdateProfileComponent,
      componentProps: {
        firstname: this.user.firstname,
        lastname: this.user.lastname,
        email: this.user.email,
        phone: this.user.phone
      }
    });
    modal.present();
  }

  async insightsModal() {
    const modal = await this.modalCtlr.create({
      component: InsightsComponent,
    });
    modal.present();
  }

  ////////////////////////////////////////////////////
  ///////////////////////////////////////////////////
  
  fileUpload(event: FileList) {
      
    const file = event.item(0)

    if (file.type.split('/')[0] !== 'image') { 
      console.log('File type is not supported!')
      return;
    }

    this.isImgUploading = true;
    this.isImgUploaded = false;

    this.FileName = file.name;

    const fileStoragePath = `quotesStorage/${new Date().getTime()}_${file.name}`;

    const imageRef = this.angularFireStorage.ref(fileStoragePath);

    this.ngFireUploadTask = this.angularFireStorage.upload(fileStoragePath, file);

    this.progressNum = this.ngFireUploadTask.percentageChanges();
    this.progressSnapshot = this.ngFireUploadTask.snapshotChanges().pipe(
      
      finalize(() => {
        this.fileUploadedPath = imageRef.getDownloadURL();
        
        this.fileUploadedPath.subscribe(resp=>{
          this.fileStorage({
            name: file.name,
            filepath: resp,
            size: this.FileSize,
            createdAt: Date.now()
          });
          this.isImgUploading = false;
          this.isImgUploaded = true;
        },error => {
          console.log(error);
        })
      }),
      tap(snap => {
          this.FileSize = snap.totalBytes;
      })
    )
}


fileStorage(image: QuoteUpload) {
    const ImgId = this.angularFirestore.createId();
    
    this.ngFirestoreCollection.doc(ImgId).set(image).then(data => {
      console.log(data);
    }).catch(error => {
      console.log(error);
    });
}  
///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////

resetUpload() {
  this.isImgUploaded = false;
}

}
