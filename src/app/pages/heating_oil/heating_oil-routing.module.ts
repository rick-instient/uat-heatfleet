import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HeatingOilPage } from './heating_oil.page';

const routes: Routes = [
  {
    path: '',
    component: HeatingOilPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HeatingOilPageRoutingModule {}
