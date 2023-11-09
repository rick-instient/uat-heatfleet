import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EnterZipPageComponent } from './enter-zip';

const routes: Routes = [
  {
    path: 'enter-zip',
    component: EnterZipPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnterZipRoutingModule {}
