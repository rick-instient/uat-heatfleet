import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TownSpecificPage } from './town-profile.page';

const routes: Routes = [
  {
    path: '',
    component: TownSpecificPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TownSpecificPageRoutingModule {}
