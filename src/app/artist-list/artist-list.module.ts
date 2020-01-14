import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ArtistListPageRoutingModule } from './artist-list-routing.module';

import { ArtistListPage } from './artist-list.page';
import { HeaderModule } from '../header/header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ArtistListPageRoutingModule,
    HeaderModule
  ],
  declarations: [ArtistListPage]
})
export class ArtistListPageModule {}
