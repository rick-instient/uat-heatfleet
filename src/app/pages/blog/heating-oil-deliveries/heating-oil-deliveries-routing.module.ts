import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeatingOilDeliveriesPageComponent } from './heating-oil-deliveries';
import { HeatingOilComponent } from './heating-oil/heating-oil.component';
import { CodFuelComponent } from './cod-fuel/cod-fuel.component';
import { CashHeatingOilComponent } from './cash-heating-oil/cash-heating-oil.component';
import { HeatingOilPricingComponent } from './heating-oil-pricing/heating-oil-pricing.component';
import { HeatingOilPriceHistoryComponent } from './heating-oil-price-history/heating-oil-price-history.component';
import { HeatingOilPriceTrendsComponent } from './heating-oil-price-trends/heating-oil-price-trends.component';
import { FuelComparisonComponent } from './fuel-comparison/fuel-comparison.component';

const routes: Routes = [
  {
    path: 'heating-oil-deliveries',
    component: HeatingOilDeliveriesPageComponent,
  },
  {
    path: 'heating-oil-deliveries/2-heating-oil-2',
    component: HeatingOilComponent,
  },
  {
    path: 'heating-oil-deliveries/cod-fuel',
    component: CodFuelComponent,
  },
  {
    path: 'heating-oil-deliveries/cash-heating-oil',
    component: CashHeatingOilComponent,
  },
  {
    path: 'heating-oil-deliveries/heating-oil-pricing-payment-plans',
    component: HeatingOilPricingComponent,
  },
  {
    path: 'heating-oil-deliveries/heating-oil-price-history',
    component: HeatingOilPriceHistoryComponent,
  },
  {
    path: 'heating-oil-deliveries/home-heating-oil-price-trends',
    component: HeatingOilPriceTrendsComponent,
  },
  {
    path: 'heating-oil-deliveries/fuel-comparison-propane-vs-natural-gas',
    component: FuelComparisonComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HeatingOilDeliveriesRoutingModule { }
