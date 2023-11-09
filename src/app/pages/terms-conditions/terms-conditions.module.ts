import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TermsConditionsPageRoutingModule } from './terms-conditions-routing.module';

import { TermsConditionsPage } from './terms-conditions.page';
import { ComponentsModule } from 'src/app/shared/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TermsConditionsPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [TermsConditionsPage],
})
export class TermsConditionsPageModule {}
