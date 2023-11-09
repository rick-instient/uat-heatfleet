import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// import { IonicModule } from '@ionic/angular';

import { OilCompaniesPageRoutingModule } from './oil-companies-page-routing.module';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { OilCompaniesPage } from './oil-companies-page.page';
// import { SharedModule } from 'src/shared/shared.module';
// import { SectionFooterComponent } from "../../heatfleet-landing/section-footer/section-footer.component";
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    // IonicModule,
    OilCompaniesPageRoutingModule,
    // SharedModule,
    ComponentsModule,
  ],
  declarations: [OilCompaniesPage],
})
export class OilCompaniesPageModule {}
