import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeatingSystemRepairPageComponent } from './heating-system-repair';
import { FurnaceRepairComponent } from './furnace-repair/furnace-repair.component';
import { OilTankReplacementComponent } from './oil-tank-replacement/oil-tank-replacement.component';
import { FuelOilTankInstallationDiagramComponent } from './fuel-oil-tank-installation-diagram/fuel-oil-tank-installation-diagram.component';
import { OilTankLeakRepairComponent } from './oil-tank-leak-repair/oil-tank-leak-repair.component';
import { OilTankProtectionPlansComponent } from './oil-tank-protection-plans/oil-tank-protection-plans.component';

const routes: Routes = [
  {
    path: 'heating-system-repair',
    component: HeatingSystemRepairPageComponent,
  },
  {
    path: 'heating-system-repair/furnace-repair',
    component: FurnaceRepairComponent,
  },
  {
    path: 'heating-system-repair/oil-tank-replacement',
    component: OilTankReplacementComponent,
  },
  {
    path: 'heating-system-repair/fuel-oil-tank-installation-diagram',
    component: FuelOilTankInstallationDiagramComponent,
  },
  {
    path: 'heating-system-repair/oil-tank-leak-repair',
    component: OilTankLeakRepairComponent,
  },
  {
    path: 'heating-system-repair/oil-tank-protection-plans',
    component: OilTankProtectionPlansComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  // declarations: [
  //   FurnanceRepairComponent,
  //   OilTankReplacementComponent,
  //   FuelOilTankInstallationDiagramComponent,
  //   OilTankLeakRepairComponent,
  //   OilTankProtectionPlansComponent,
  // ],
})
export class HeatingSystemRepairRoutingModule {}
