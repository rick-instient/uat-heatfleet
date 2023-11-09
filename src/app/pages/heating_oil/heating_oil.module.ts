import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HeatingOilPageRoutingModule } from './heating_oil-routing.module';
import { ComponentsModule } from '../../shared/components/components.module';
import { HeatingOilPage } from './heating_oil.page';
// import { OilHistoricChartComponent } from './oil-historic-chart/oil-historic-chart.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HeatingOilPageRoutingModule,
    ReactiveFormsModule,
    ComponentsModule,
  ],
  declarations: [HeatingOilPage],
})
export class HeatingOilPageModule {}
