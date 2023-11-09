import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeatingSystemRepairPageComponent } from './heating-system-repair';


const routes: Routes = [
  {
    path: 'heating-system-repair',
    component: HeatingSystemRepairPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HeatingSystemRepairRoutingModule {}
