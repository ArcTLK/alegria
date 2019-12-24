import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';


import { HeaderComponent } from './header.component';
import { PopoverMenuComponent } from '../popover-menu/popover-menu.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule
  ],
  declarations: [
    HeaderComponent,
    PopoverMenuComponent
  ],
  exports: [HeaderComponent],
  entryComponents: [PopoverMenuComponent]
})
export class HeaderModule {}
