import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StateProfilePage } from './state-profile.page';

const routes: Routes = [
  {
    path: '',
    component: StateProfilePage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StateProfilePageRoutingModule {}
