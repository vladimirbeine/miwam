import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  credentials: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loadingCtler: LoadingController,
    private alertCtler: AlertController,
    private authService: AuthService,
    private router: Router
  ) { }

  get firstname() {
    return this.credentials.get('firstname');
  }
 
  get lastname() {
    return this.credentials.get('lastname');
  }

  get email() {
    return this.credentials.get('email');
  }
 
  get password() {
    return this.credentials.get('password');
  }

  get phone() {
    return this.credentials.get('phone');
  }

  ngOnInit() {
    this.credentials = this.fb.group({
      firstname: ['', [Validators.compose([Validators.maxLength(26), Validators.required])]],
      lastname: ['', [Validators.compose([Validators.maxLength(26), Validators.required])]],
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.minLength(6), Validators.required]],
      phone: ['', [Validators.compose([Validators.maxLength(8)])]]
    });
  }
  
  async signup() {
    const loading = await this.loadingCtler.create();
    await loading.present();

    this.authService.signup(this.credentials.value).then(async () => {
      await loading.dismiss().then(() => {
        this.router.navigateByUrl('/tabs/profile', {replaceUrl: true});
      });
    }).catch(e => {
      this.showAlert('Signup fialed', 'Please try again');
    });
  }

  async showAlert(header, message) {
    const alert = await this.alertCtler.create({
      header,
      message,
      buttons: ['Ok']
    });
    await alert.present();
  }

}