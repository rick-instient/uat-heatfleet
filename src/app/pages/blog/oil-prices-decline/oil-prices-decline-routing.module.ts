import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OilPricesDeclinePageComponent } from './oil-prices-decline';

const routes: Routes = [
  {
    path: 'oil-prices-decline',
    component: OilPricesDeclinePageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OilPricesDeclineRoutingModule {}
