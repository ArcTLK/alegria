import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { ToastController, Platform } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';

@Component({
  selector: 'app-qr-scanner',
  templateUrl: './qr-scanner.page.html',
  styleUrls: ['./qr-scanner.page.scss'],
})
export class QrScannerPage implements OnInit, OnDestroy {
  private scanSub: any;
  private userSub: any;
  public userId: string = null;
  constructor(
    private qrScanner: QRScanner,
    private router: Router,
    private toastController: ToastController,
    private platform: Platform,
    private angularFireAuth: AngularFireAuth,
    private angularFirestore: AngularFirestore,
    private splashScreen: SplashScreen
  ) { }

  ionViewWillLeave() {
    window.document.querySelector('ion-app').classList.remove('cameraView');
    this.qrScanner.pausePreview();
  }
  ionViewWillEnter() {
    if (this.userId !== null) {
      window.document.querySelector('ion-app').classList.add('cameraView');
      this.qrScanner.resumePreview();
    }
  }

  ngOnDestroy() {
    window.document.querySelector('ion-app').classList.remove('cameraView');
    this.scanSub.unsubscribe();
    this.qrScanner.destroy();
    this.userSub.unsubscribe();
  }
  ngOnInit() {
    // user subscription
    this.userSub = this.angularFireAuth.user.subscribe(user => {
      if (user !== null) {
        this.openScanner();
        this.userId = user.uid;
      }
    });
  }

  async openScanner() {
    // wait for platform to be ready to use qr scanner
    await this.platform.ready();
    // ask for permission to use camera
    const status: QRScannerStatus = await this.qrScanner.prepare();
    if (status.authorized) {
      // show camera preview
      window.document.querySelector('ion-app').classList.add('cameraView');
      this.qrScanner.show();

      // start scanning
      this.scanSub = this.qrScanner.scan().subscribe(async (text: string) => {
        this.angularFirestore.collection('QRCodes').add({
          code: text,
          scannedBy: this.userId,
          time: Date.now(),
          validity: 'Verification pending'
        });
        // open QR Code
        window.open(text, '_self');
        this.splashScreen.hide();
      });
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
  }
}
