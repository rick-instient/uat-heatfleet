import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DirectHeatPageComponent } from './direct-heat';


const routes: Routes = [
  {
    path: 'direct-heat',
    component: DirectHeatPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DirectHeatRoutingModule {}
