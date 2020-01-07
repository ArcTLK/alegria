import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-qr-history',
  templateUrl: './qr-history.page.html',
  styleUrls: ['./qr-history.page.scss'],
})
export class QrHistoryPage implements OnInit, OnDestroy {
  private userSub: any;
  public QRCodes: any[];
  constructor(
    private angularFireAuth: AngularFireAuth,
    private angularFirestore: AngularFirestore
  ) { }

  ngOnInit() {
    this.userSub = this.angularFireAuth.user.subscribe(user => {
      if (user !== null) {
        this.angularFirestore.collection('QRCodes').ref.where('scannedBy', '==', user.uid).onSnapshot({
          next: data => {
            this.QRCodes = data.docs.map((value: any) => {
              const data = value.data();
              value.time = (new Date(data.time)).toLocaleString();
              value.code = data.code;
              return value;
            });
          }
        });
      }
    });
  }
  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

}
