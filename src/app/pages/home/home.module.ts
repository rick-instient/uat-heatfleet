import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { ComponentsModule } from 'src/app/shared/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HomePageRoutingModule,
    ComponentsModule,
    // HeaderClientComponent
    // HeaderComponent,
  ],
  declarations: [
    HomePage,
    // HeaderClientComponent,
    // SectionBestpricesComponent,
    // SectionMainComponent,
    // HeatingOilLocationsComponent,
    // SectionComparepricesComponent,
    // SectionHowitworksComponent,
    // SectionWhyComponent,
    // SectionWhy2Component,
    // SectionFooterComponent,
    // SectionFaqsComponent,
    // // HeaderComponent
  ],
})
export class HomePageModule {}
