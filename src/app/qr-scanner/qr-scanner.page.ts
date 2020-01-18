import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
/*
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
*/
import { /*ToastController, Platform, LoadingController, */AlertController } from '@ionic/angular';
/*import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
*/
@Component({
  selector: 'app-qr-scanner',
  templateUrl: './qr-scanner.page.html',
  styleUrls: ['./qr-scanner.page.scss'],
})
export class QrScannerPage implements OnInit, OnDestroy {
  /*private scanSub: any;
  private userSub: any;*/
  public userId: string = null;
  constructor(
    /*private qrScanner: QRScanner,*/
    private router: Router,
    /*private toastController: ToastController,
    private platform: Platform,
    private angularFireAuth: AngularFireAuth,
    private angularFirestore: AngularFirestore,
    private androidPermissions: AndroidPermissions,
    private loadingController: LoadingController,
    private inAppBrowser: InAppBrowser,*/
    private alertController: AlertController
  ) { }

  ionViewWillLeave() {
    //window.document.querySelector('ion-app').classList.remove('cameraView');
    //this.qrScanner.pausePreview();
  }
  ionViewWillEnter() {
    this.alertController.create({
      header: 'Thank you',
      message: 'We are happy with your participation in Alegria 2020\'s QR Code competition. Results will be announced soon!',
      buttons: [
        {
          text: 'Go back',
          handler: () => {
            this.router.navigateByUrl('/home');
          }
        }
      ]
    }).then(alert => alert.present());
    // user subscription
    /*
    this.userSub = this.angularFireAuth.user.subscribe(user => {
      if (user !== null) {
        this.userId = user.uid;
        //this.openScanner();
      }
    });*/

  }

  ngOnDestroy() {
    /*
    window.document.querySelector('ion-app').classList.remove('cameraView');
    this.scanSub.unsubscribe();
    this.qrScanner.destroy();
    this.userSub.unsubscribe();
    this.userId = null;
    */
  }
  ngOnInit() {
  }
  /*
  async startScan() {
    // start scanning
    this.scanSub = this.qrScanner.scan().subscribe(async (text: string) => {
      this.angularFirestore.collection('QRCodes').add({
        code: text,
        scannedBy: this.userId,
        time: Date.now()
      });
      // open QRCode as a URL
      const ref = this.inAppBrowser.create(text, '_blank', 'location=no,zoom=no');
      ref.on('exit').subscribe(() => this.startScan());
    });
  }
  async openScanner() {
    // wait for platform to be ready to use qr scanner
    await this.platform.ready();
    const result = await this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.CAMERA);
    if (result.hasPermission === false) {
      const result2 = await this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.CAMERA);
      if (result2.hasPermission) {
        const loading = await this.loadingController.create({
          message: 'Initializing QR scanner...'
        });
        await loading.present();
        return location.reload();
      }
      else {
        // permission was denied, but not permanently. You can ask for permission again at a later time.
        const toast = await this.toastController.create({
          message: 'Camera permission has been denied!',
          duration: 2000
        });
        await toast.present();
        return location.href = '/home';
      }
    }
    // ask for permission to use camera
    const status: QRScannerStatus = await this.qrScanner.prepare();
    if (status.authorized) {
      // show camera preview
      await this.qrScanner.show();
      window.document.querySelector('ion-app').classList.add('cameraView');
      await this.startScan();
    }
    else if (status.denied) {
      // camera permission was permanently denied
      // you must use QRScanner.openSettings() method to guide the user to the settings page
      // then they can grant the permission from there
      alert('Permission denied! You can enable it again from your device\'s settings menu.');
      this.qrScanner.openSettings();
    }
    else {
      // permission was denied, but not permanently. You can ask for permission again at a later time.
      const toast = await this.toastController.create({
        message: 'Camera permission has been denied!',
        duration: 2000
      });
      toast.present();
      this.router.navigateByUrl('/home');
    }
  }*/
}
