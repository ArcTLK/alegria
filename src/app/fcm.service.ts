import { Injectable } from '@angular/core';
import { FirebaseX } from '@ionic-native/firebase-x/ngx';
import { Platform } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class FcmService {
  constructor(
    private platform: Platform,
    private firebase: FirebaseX,
    private angularFirestore: AngularFirestore,
    private angularFireAuth: AngularFireAuth
  ) { }

  async getToken() {
    let token: string;
    var authSub = this.angularFireAuth.user.subscribe(async user => {
      // if logged in
      if (user !== null) {
        if (this.platform.is('android')) {
          token = await this.firebase.getToken();
        }

        else if (this.platform.is('ios')) {
          token = await this.firebase.getToken();
          await this.firebase.grantPermission();
        }

        this.saveToken(token, user.uid);
        authSub.unsubscribe();
      }
    });
  }

  private saveToken(token: string, userId: string) {
    if (!token) return;

    const data = {
      token,
      userId
    };

    return this.angularFirestore.collection('devices').doc(token).set(data);
  }

  onNotifications() {
    return this.firebase.onMessageReceived();
  }
}
