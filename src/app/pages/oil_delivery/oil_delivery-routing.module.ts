import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OilDeliveryPage } from './oil_delivery.page';

const routes: Routes = [
  {
    path: '',
    component: OilDeliveryPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OilDeliveryPageRoutingModule {}
