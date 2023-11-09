import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// import { IonicModule } from '@ionic/angular';

import { TownSpecificPageRoutingModule } from './town-profile-routing.module';
// import { ComponentsModule } from 'src/app/components/components.module';
import { TownSpecificPage } from './town-profile.page';
import { ComponentsModule } from 'src/app/shared/components/components.module';
// import { SectionMainComponent } from "src/app/heatfleet-landing/section-main/section-main.component";
// import { IonicStorageModule } from "@ionic/storage-angular";
// import { TownHistoricChartComponent } from "./town-historic-chart/town-historic-chart.component";
// import { TownPricesMapComponent } from "./town-prices-map/town-prices-map.component";
// import { SharedModule } from 'src/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    // IonicModule,
    TownSpecificPageRoutingModule,
    ComponentsModule,
    // IonicStorageModule.forRoot(),
    // SharedModule,
  ],
  declarations: [TownSpecificPage,],
  providers: [],
})
export class TownProfilePageModule {}
