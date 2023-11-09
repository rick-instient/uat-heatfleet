import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BestPriceCodFuelPageComponent } from './best-price-cod-fuel';

const routes: Routes = [
  {
    path: 'top-10-places-for-best-price-cod-fuel-oil-in-long-island',
    component: BestPriceCodFuelPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BestPriceCodFuelRoutingModule {}
