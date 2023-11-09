import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// import { IonicModule } from '@ionic/angular';

// import { ComponentsModule } from 'src/app/components/components.module';
// import { SectionMainComponent } from "src/app/heatfleet-landing/section-main/section-main.component";
// import { IonicStorageModule } from "@ionic/storage-angular";
import { ComponentsModule } from 'src/app/shared/components/components.module';

import { StateProfilePage } from './state-profile.page';
import { StateProfilePageRoutingModule } from './state-profile-routing.module';
// import { HttpClientModule } from '@angular/common/http';
// import { RouterModule } from '@angular/router';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    StateProfilePageRoutingModule,
    // SharedModule,
    ComponentsModule,
    ReactiveFormsModule,
    // HttpClientModule,

    // RouterModule,
  ],
  declarations: [StateProfilePage],
})
export class StateProfilePageModule {}
