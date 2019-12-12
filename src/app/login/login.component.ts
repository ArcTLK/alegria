import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Platform } from '@ionic/angular';
import { environment } from '../../environments/environment';

declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})

export class LoginComponent implements OnInit {
  public native: Boolean;

  constructor(
    private platform: Platform,
    private nativeStorage: NativeStorage,
    private googlePlus: GooglePlus,
    private router: Router
  ) { }
  ngOnInit() {
    this.native = this.platform.is('cordova');
    // if not native, load gapi scripts for web app

  }
  // function to used for loading auth2 for web app
  initAuth2() {
    // TODO: refer to https://stackoverflow.com/questions/38846232/how-to-implement-signin-with-google-in-angular-2-using-typescript
    // also create a onSignIn function when executed logs in and navigates user to the tab
    gapi.load('auth2', () => {
      /* Ready. Make a call to gapi.auth2.init or some other API */
    });
  }

  /*
  async presentLoading(loading) {
		return await loading.present();
	}*/

  async doGoogleLogin(){
    /*
    // add loading component (splash screen)
  	const loading = await this.loadingController.create({
  		message: 'Please wait...'
  	});
  	this.presentLoading(loading);
    */
  	this.googlePlus.login({
  		'scopes': '', // optional, space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
  		'webClientId': environment.webClientId, // optional clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
  		'offline': true // Optional, but requires the webClientId - if set to true the plugin will also return a serverAuthCode, which can be used to grant offline access to a non-Google server
  	})
  	.then(user =>{
  		//loading.dismiss();
      console.log(user);
      /*
  		this.nativeStorage.setItem('user', {
  			name: user.displayName,
  			email: user.email,
  			picture: user.imageUrl
  		})
  		.then(() =>{
  			this.router.navigate(["/tabs/tab1"]);
  		}, error =>{
  			console.log(error);
  		})*/
  		//loading.dismiss();
  	}, err =>{
  		console.log(err)
  		//loading.dismiss();
  	});
  }
}
