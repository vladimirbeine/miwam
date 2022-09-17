import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss'],
})
export class UpdateProfileComponent implements OnInit {

  constructor(
    private modalCtlr: ModalController
  ) { }

  ngOnInit() {}

  closeModal() {
    this.modalCtlr.dismiss();
  }


}
