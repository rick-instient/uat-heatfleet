import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// import { HeaderClientComponent } from 'src/app/components/header-client/header-client.component';
import { SectionMainComponent } from 'src/app//shared/components/section-main/section-main.component';
import { SectionBestpricesComponent } from 'src/app/shared/components/section-bestprices/section-bestprices.component';

import { HeatingOilLocationsComponent } from 'src/app/shared/components/heating-oil-locations/heating-oil-locations.component';
import { SectionComparepricesComponent } from 'src/app/shared/components/section-compareprices/section-compareprices.component';
import { SectionHowitworksComponent } from 'src/app/shared/components/section-howitworks/section-howitworks.component';
import { SectionWhyComponent } from 'src/app/shared/components/section-why/section-why.component';
import { SectionWhy2Component } from 'src/app/shared/components/section-why2/section-why2.component';
// import { SectionFooterComponent } from 'src/app/components/section-footer/section-footer.component';
import { SectionFaqsComponent } from 'src/app/shared/components/section-faqs/section-faqs.component';
import { HistoricalPriceChartComponent } from 'src/app/shared/components/historical-price-chart/historical-price-chart.component';
import { SubscriptionComponent } from 'src/app/shared/components/subscription/subscription.component';
import { DeliveryMapComponent } from 'src/app/shared/components/delivery-map/delivery-map.component';
import { FuelComparisonComponent } from 'src/app/shared/components/fuel-comparison/fuel-comparison.component';
import { FuelConsumptionComponent } from 'src/app/shared/components/fuel-consumption/fuel-consumption.component';
import { OilCompanyGuideComponent } from 'src/app/shared/components/oil-company-guide/oil-company-guide.component';
import { OilDeliveryOverviewComponent } from 'src/app/shared/components/oil-delivery-overview/oil-delivery-overview.component';
import { OilPriceDetailsComponent } from 'src/app/shared/components/oil-price-details/oil-price-details.component';
import { OilCompaniesComponent } from 'src/app/shared/components/oil-companies/oil-companies.component';
import { SectionNearComponent } from 'src/app/shared/components/section-near/section-near.component';

import { TownHistoricChartComponent } from 'src/app/pages/town-profile/town-historic-chart/town-historic-chart.component';
import { SectionAboutComponent } from './section-about/section-about.component';
import { ModalComponent } from './modal/modal.component';
import { ToasterComponent } from './toaster/toaster.component';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  declarations: [
    // HeaderClientComponent,
    SectionBestpricesComponent,
    SectionMainComponent,
    HeatingOilLocationsComponent,
    SectionComparepricesComponent,
    SectionHowitworksComponent,
    SectionWhyComponent,
    SectionWhy2Component,
    // SectionFooterComponent,
    SectionFaqsComponent,
    HistoricalPriceChartComponent,
    TownHistoricChartComponent,
    SubscriptionComponent,
    DeliveryMapComponent,
    FuelComparisonComponent,
    FuelConsumptionComponent,
    OilCompanyGuideComponent,
    OilDeliveryOverviewComponent,
    OilPriceDetailsComponent,
    OilCompaniesComponent,
    SectionNearComponent,
    SectionAboutComponent,
    ModalComponent,
    ToasterComponent
  ],
  exports: [
    // HeaderClientComponent,
    SectionBestpricesComponent,
    SectionMainComponent,
    HeatingOilLocationsComponent,
    SectionComparepricesComponent,
    SectionHowitworksComponent,
    SectionWhyComponent,
    SectionWhy2Component,
    // SectionFooterComponent,
    SectionFaqsComponent,
    HistoricalPriceChartComponent,
    TownHistoricChartComponent,
    SubscriptionComponent,
    DeliveryMapComponent,
    FuelComparisonComponent,
    FuelConsumptionComponent,
    OilCompanyGuideComponent,
    OilDeliveryOverviewComponent,
    OilPriceDetailsComponent,
    OilCompaniesComponent,
    SectionNearComponent,
    SectionAboutComponent,
    ModalComponent,
    ToasterComponent
  ],
})
export class ComponentsModule { }
