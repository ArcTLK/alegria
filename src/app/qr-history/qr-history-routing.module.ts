import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QrHistoryPage } from './qr-history.page';

const routes: Routes = [
  {
    path: '',
    component: QrHistoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QrHistoryPageRoutingModule {}
