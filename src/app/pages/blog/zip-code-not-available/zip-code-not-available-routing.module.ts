import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ZipCodeNotAvailablePageComponent } from './zip-code-not-available';

const routes: Routes = [
  {
    path: 'zip-code-not-available',
    component: ZipCodeNotAvailablePageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ZipCodeNotAvailableRoutingModule {}
