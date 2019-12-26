import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QrScannerPageRoutingModule } from './qr-scanner-routing.module';

import { QrScannerPage } from './qr-scanner.page';
import { QRScanner } from '@ionic-native/qr-scanner/ngx';
import { HeaderModule } from '../header/header.module';
import { LoginModule } from '../login/login.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QrScannerPageRoutingModule,
    HeaderModule,
    LoginModule
  ],
  declarations: [QrScannerPage],
  providers: [
    QRScanner
  ]
})
export class QrScannerPageModule {}
