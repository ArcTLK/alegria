import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Platform, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';

import { FcmService } from './fcm.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private fcmService: FcmService,
    private toastController: ToastController,
    private router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.splashScreen.hide();
      // fcm only if cordova is supported
      if (this.platform.is('cordova')) {
        this.notificationSetup();
      }
    });
  }

  private async notificationSetup() {
    this.fcmService.getToken();
    this.fcmService.onNotifications().subscribe(async msg => {
      if (msg.tap !== 'background') {
        let message: string;
        if (this.platform.is('ios')) {
          message = msg.aps.alert;
        }
        else {
          message = msg.body;
        }
        const toast = await this.toastController.create({
          message,
          duration: 3000
        });
        toast.present();
      }
      else {
        if (msg.redirectTo !== undefined) {
          this.router.navigateByUrl(msg.redirectTo);
        }
      }
    });
  }
}
