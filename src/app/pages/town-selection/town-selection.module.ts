import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ComponentsModule } from 'src/app/shared/components/components.module';
// import { SectionMainComponent } from "src/app/heatfleet-landing/section-main/section-main.component";
// import { IonicStorageModule } from "@ionic/storage-angular";
import { SharedModule } from 'src/app/shared/helper/shared.module';
import { TownSelectionPage } from './town-selection.page';
import { TownSelectionPageRoutingModule } from './town-selection-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ComponentsModule,
    HttpClientModule,
    SharedModule,
    ComponentsModule,
    RouterModule,
    TownSelectionPageRoutingModule,
  ],
  declarations: [TownSelectionPage],
  providers: [],
})
export class TownSelectionPageModule {}
