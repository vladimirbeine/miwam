import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-home-header-more-settings-popover',
  templateUrl: './home-header-more-settings-popover.component.html',
  styleUrls: ['./home-header-more-settings-popover.component.scss'],
})
export class HomeHeaderMoreSettingsPopoverComponent implements OnInit {

  languages = [];
  selectedLng = '';
  selectedTheme = '';

  constructor(
    private langService: LanguageService,
    private popoverCtlr: PopoverController
  ) { }

  ngOnInit() {
    this.languages = this.langService.getLanguages();
    this.selectedLng = this.langService.selectedLng;
  }

  select(lng) {
    this.langService.setLanguage(lng);
    this.popoverCtlr.dismiss();
  }

  onClick(event){
    let systemDark = window.matchMedia("(prefers-color-scheme: dark)");
    systemDark.addListener(this.colorTest);
    if(event.detail.checked){
      document.body.setAttribute('data-theme', 'dark');
      this.selectedTheme = "dark";
    }
    else{
      document.body.setAttribute('data-theme', 'light');
      this.selectedTheme = "light";
    }
  }

  selectTheme() {
    this.langService.setTheme(this.selectTheme);
    this.popoverCtlr.dismiss();
  }

   colorTest(systemInitiatedDark) {
    if (systemInitiatedDark.matches) {
      document.body.setAttribute('data-theme', 'dark');		
    } else {
      document.body.setAttribute('data-theme', 'light');
    }
  }

}
