import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { BestPriceCodFuelPageComponent } from './best-price-cod-fuel/best-price-cod-fuel';
import { DirectHeatPageComponent } from './direct-heat/direct-heat';
import { HeatingOilDeliveriesPageComponent } from './heating-oil-deliveries/heating-oil-deliveries';
import { OilPricesDeclinePageComponent } from './oil-prices-decline/oil-prices-decline';
import { ZipCodeNotAvailablePageComponent } from './zip-code-not-available/zip-code-not-available';
import { EnterZipPageComponent } from './enter-zip/enter-zip';
import { BlogComponent } from './blog.component';

const routes: Routes = [
  {
    path: '',
    component: BlogComponent,
  },
  {
    path: 'home',
    component: HomePageComponent,
  },
  {
    path: 'top-10-places-for-best-price-cod-fuel-oil-in-long-island',
    component: BestPriceCodFuelPageComponent,
  },
  {
    path: 'direct-heat',
    component: DirectHeatPageComponent,
  },
  {
    path: 'enter-zip',
    component: EnterZipPageComponent,
  },
  {
    path: 'heating-oil-deliveries',
    component: HeatingOilDeliveriesPageComponent,
  },
  {
    path: 'oil-prices-decline',
    component: OilPricesDeclinePageComponent,
  },
  {
    path: 'zip-code-not-available',
    component: ZipCodeNotAvailablePageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BlogRoutingModule {}
