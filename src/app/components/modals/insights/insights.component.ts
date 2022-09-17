import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-insights',
  templateUrl: './insights.component.html',
  styleUrls: ['./insights.component.scss'],
})
export class InsightsComponent implements OnInit {

  constructor(
    private modalCtlr: ModalController
  ) { }

  ngOnInit() {}

  closeModal() {
    this.modalCtlr.dismiss();
  }

}
