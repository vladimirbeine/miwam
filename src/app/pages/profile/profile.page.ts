import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { UserInterface } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  user : UserInterface = {
    id: '',
    email: '',
    firstname: '',
    lastname: '',
    createdAt: new Date().getTime(),
    phone: null
  };

  constructor(private authService: AuthService, private router: Router, private loadingController: LoadingController, private auth: Auth) { }

  ngOnInit() {
    this.loadUserProfile();
  }

  async loadUserProfile(): Promise<any> {
    const loading = await this.loadingController.create({
      message: "Loading Todo..",
    });
    await loading.present();

    this.authService.getCurrentUser(this.auth.currentUser.uid).subscribe((res) => {
      loading.dismiss();
      this.user = res;


      console.log('Res: ', this.user);
    });

    console.log(this.auth.currentUser.uid);
  }

  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('/tabs/home');
  }

}
