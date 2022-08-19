import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {
  credentials: FormGroup;
 
  constructor(
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private authService: AuthService,
    private router: Router
  ) {}

  get email() {
    return this.credentials.get('email');
  }
 
  get password() {
    return this.credentials.get('password');
  }
 
  ngOnInit() {
    this.credentials = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
 
  async signin() {
    const loading = await this.loadingController.create();
    await loading.present();
 
    const user = await this.authService.signin(this.credentials.value);
    await loading.dismiss();
 
    if (user) {
      this.router.navigateByUrl('/tabs/profile', { replaceUrl: true });
    } else {
      this.showAlert('Login failed', 'Please try again!');
    }
  }
 
  async showAlert(header, message) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }

}
