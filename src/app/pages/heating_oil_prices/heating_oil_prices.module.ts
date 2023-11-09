import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeatingOilPricesPageRoutingModule } from './heating_oil_prices-routing.module';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { HeatingOilPricesPage } from './heating_oil_prices.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HeatingOilPricesPageRoutingModule,
    ComponentsModule,
    ReactiveFormsModule,
  ],
  declarations: [HeatingOilPricesPage, ],
})
export class HeatingOilPricesPageModule {}
