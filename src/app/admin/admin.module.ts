import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminPageRoutingModule } from './admin-routing.module';

import { AdminPage } from './admin.page';
import { HeaderModule } from '../header/header.module';
import { CategoryEditModalComponent } from '../category-edit-modal/category-edit-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminPageRoutingModule,
    HeaderModule
  ],
  declarations: [
    AdminPage,
    CategoryEditModalComponent
  ],
  entryComponents: [CategoryEditModalComponent]
})
export class AdminPageModule {}
