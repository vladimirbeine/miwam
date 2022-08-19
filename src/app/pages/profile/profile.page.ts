import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  user: any;

  constructor(
    private authService: AuthService,
    private profileService: ProfileService,
    private router: Router,
    private loadingController: LoadingController
    ) {
    this.loadProfile();
    }

  ngOnInit() { }

  async loadProfile(): Promise<any> {
    const loading = await this.loadingController.create({
      message: "Loading Profile...",
    });
    await loading.present();

    this.profileService.getProfile().subscribe((res) => {
      this.user = res;
      console.log("Profile data: ", this.user)
      loading.dismiss();
    });
  }


  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('/tabs/home');
  }

}
