import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QrHistoryPageRoutingModule } from './qr-history-routing.module';

import { QrHistoryPage } from './qr-history.page';
import { HeaderModule } from '../header/header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QrHistoryPageRoutingModule,
    HeaderModule
  ],
  declarations: [QrHistoryPage]
})
export class QrHistoryPageModule {}
