import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CountiesSelectionPage } from './counties-selection.page';

const routes: Routes = [
  {
    path: '',
    component: CountiesSelectionPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CountiesSelectionPageRoutingModule {}
