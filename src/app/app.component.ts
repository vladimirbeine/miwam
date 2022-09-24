import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AuthService } from './services/auth.service';
import { LanguageService } from './services/language.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  constructor(
    private lngService: LanguageService,
    private authService: AuthService,
    private router: Router,
    private menuCtlr: MenuController
    ) {}

  ngOnInit() {
    this.lngService.setInitialAppLanguage();
  }

  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('/tabs/home');
  }

  openSettingsPage() {
    this.router.navigateByUrl("/settings");
    this.menuCtlr.close();
  }
}
