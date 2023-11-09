import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HeatingOilPricesPage } from './heating_oil_prices.page';

const routes: Routes = [
  {
    path: '',
    component: HeatingOilPricesPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HeatingOilPricesPageRoutingModule {}
