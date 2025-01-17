import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategoryPageRoutingModule } from './category-routing.module';

import { CategoryPage } from './category.page';
import { HeaderModule } from '../header/header.module';
import { IonicImageLoader } from 'ionic-image-loader';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategoryPageRoutingModule,
    HeaderModule,
    IonicImageLoader
  ],
  declarations: [CategoryPage]
})
export class CategoryPageModule {}
