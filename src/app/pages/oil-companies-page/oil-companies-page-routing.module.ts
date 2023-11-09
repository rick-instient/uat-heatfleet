import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OilCompaniesPage } from './oil-companies-page.page';

const routes: Routes = [
  {
    path: '',
    component: OilCompaniesPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OilCompaniesPageRoutingModule {}
