import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OilDeliveryPageRoutingModule } from './oil_delivery-routing.module';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { OilDeliveryPage } from './oil_delivery.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    OilDeliveryPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [OilDeliveryPage],
})
export class OilDeliveryPageModule {}
