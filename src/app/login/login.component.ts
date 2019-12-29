import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Platform } from '@ionic/angular';
import { auth } from 'firebase/app';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private angularFireAuth: AngularFireAuth,
    private googlePlus: GooglePlus,
    private platform: Platform
  ) { }

  ngOnInit() {}

  async login() {
    // if cordova, login using native APIs
    if (this.platform.is('cordova')) {
      this.nativeGoogleLogin();
    }
    else {
      this.webGoogleLogin();
    }
  }

  async nativeGoogleLogin() {
    try {
      const user = await this.googlePlus.login({
        'webClientId': environment.webClientId,
        'offline': true,
        'scopes': 'profile email'
      });
      return await this.angularFireAuth.auth.signInWithCredential(
        auth.GoogleAuthProvider.credential(user.idToken)
      );
    }
    catch(error) {
      console.log(error);
    }
  }

  async webGoogleLogin() {
    try {
      return await this.angularFireAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
    }
    catch(error) {
      console.log(error);
    }
  }
}
