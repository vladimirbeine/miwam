import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.scss'],
})
export class CardDetailsComponent implements OnInit {
  @Input() url: string;
  @Input() time: string;

  constructor() { }

  ngOnInit() {
    console.log(this.url);
  }

}
