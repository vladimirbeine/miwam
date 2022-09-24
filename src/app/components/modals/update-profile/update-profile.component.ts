import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { ModalController } from '@ionic/angular';
import { ToastService } from 'src/app/services/controllers/toast.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss'],
})
export class UpdateProfileComponent implements OnInit {

  constructor(
    private modalCtlr: ModalController,
    private profileService: ProfileService,
    private toastCtlr: ToastService,
    private auth: Auth
  ) { }

  async update(
    firstname: string,
    lastname: string,
    email: string,
    phone: number
    ) {
      const id = this.auth.currentUser.uid;
    await this.profileService.updateProfile(id, firstname, lastname, email, phone).then(() => {
      const message: string = "Profil modfie avec succes!"
      this.toastCtlr.default(message);
      this.modalCtlr.dismiss();
    }).catch(e => {
      const message: string = "Votre profil n'a pas ete modifie!"
      this.toastCtlr.error(message);
    });
  }

  ngOnInit() {}

  closeModal() {
    this.modalCtlr.dismiss();
  }


}
