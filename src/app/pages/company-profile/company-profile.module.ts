import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/app/shared/components/components.module';
// import { SharedModule } from "src/shared/shared.module";

import { CompanyProfilePageRoutingModule } from './company-profile-routing.module';

import { CompanyProfilePage } from './company-profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CompanyProfilePageRoutingModule,
    ComponentsModule,
    // SharedModule,
  ],
  declarations: [CompanyProfilePage],
})
export class CompanyProfilePageModule {}
