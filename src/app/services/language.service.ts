import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';
import { Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';


const LNG_KEY = '';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  selected: any = null;

  constructor(private translate: TranslateService, private platform: Platform) { }

  setInitialAppLanguage() {
    let language = this.translate.getBrowserLang();
    this.translate.setDefaultLang(language);

    this.setLanguage(language);

    console.log("Lng: ", language);
  }

  getLanguages() {
    return [
      {text: 'Enlgish', value: 'en', icon: 'assets/images/en.png'},
      {text: 'Spanish', value: 'sp', icon: 'assets/images/sp.png'},
      {text: 'French', value: 'fr', icon: 'assets/images/fr.png'},
      {text: 'Creole', value: 'ht', icon: 'assets/images/ht.png'}
    ]
  }

  setLanguage(lng) {
    this.translate.use(lng);
    Storage.set({
      key: 'LNG_KEY',
      value: lng
    });
    this.selected = lng;
  }
}
