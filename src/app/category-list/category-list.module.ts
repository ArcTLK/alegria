import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategoryListPageRoutingModule } from './category-list-routing.module';

import { CategoryListPage } from './category-list.page';
import { HeaderModule } from '../header/header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategoryListPageRoutingModule,
    HeaderModule
  ],
  declarations: [CategoryListPage]
})
export class CategoryListPageModule {}
