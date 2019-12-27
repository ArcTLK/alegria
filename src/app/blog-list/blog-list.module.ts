import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BlogListPageRoutingModule } from './blog-list-routing.module';

import { BlogListPage } from './blog-list.page';
import { HeaderModule } from '../header/header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BlogListPageRoutingModule,
    HeaderModule
  ],
  declarations: [BlogListPage]
})
export class BlogListPageModule {}
