import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';
import { TranslateService } from '@ngx-translate/core';


@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  selectedLng: any = null;
  selectedTheme: any = null;

  constructor(private translate: TranslateService) { }

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
    this.selectedLng = lng;
  }

  setTheme(theme) {
    this.translate.use(theme);
    Storage.set({
      key: 'THEME_KEY',
      value: theme
    });
    this.selectedTheme = theme;
  }
}
