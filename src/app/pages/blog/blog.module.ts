import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

// main or parents components
import { BlogRoutingModule } from "./blog-routing.module";
// -----------------------------------------components-----------------------------------------
import { BlogComponent } from "./blog.component";
import { OilCentralHeatingComponent } from "./oil-central-heating/oil-central-heating.component";
import { HomePageComponent } from "./home-page/home-page.component";
import { BestPriceCodFuelPageComponent } from "./best-price-cod-fuel/best-price-cod-fuel";
import { DirectHeatPageComponent } from "./direct-heat/direct-heat";
import { HeatingOilDeliveriesPageComponent } from "./heating-oil-deliveries/heating-oil-deliveries";
import { HeatingSystemRepairPageComponent } from "./heating-system-repair/heating-system-repair";
import { OilPricesDeclinePageComponent } from "./oil-prices-decline/oil-prices-decline";
import { ZipCodeNotAvailablePageComponent } from "./zip-code-not-available/zip-code-not-available";
import { EnterZipPageComponent } from "./enter-zip/enter-zip";
import { BreadcrumbsComponent } from './UtilityComponents/breadcrumbs/breadcrumbs.component';

// oil central heating imports
import { OilCentralHeatingRoutingModule } from "./oil-central-heating/oil-central-heating-routing.module";
// -----------------------------------------components-----------------------------------------
import { FuelOilFurnaceComponent } from './oil-central-heating/fuel-oil-furnace/fuel-oil-furnace.component';
import { OilTankChartComponent } from './oil-central-heating/oil-tank-chart/oil-tank-chart.component';
import { OilTankGuideComponent } from './oil-central-heating/oil-tank-guide/oil-tank-guide.component';
import { FuelOilFurnaceAndBoilerBrandsComponent } from './oil-central-heating/fuel-oil-furnace-and-boiler-brands/fuel-oil-furnace-and-boiler-brands.component';
import { GranbyVsRothComponent } from './oil-central-heating/granby-vs-roth/granby-vs-roth.component';
import { FuelOilFurnaceAndBoilerSizesComponent } from './oil-central-heating/fuel-oil-furnace-and-boiler-sizes/fuel-oil-furnace-and-boiler-sizes.component';
import { OilTankGaugeComponent } from './oil-central-heating/oil-tank-gauge/oil-tank-gauge.component';

// heating system repair imports 
import { HeatingSystemRepairRoutingModule } from "./heating-system-repair/heating-system-repair-routing.module";
// -----------------------------------------components-----------------------------------------
import { OilTankProtectionPlansComponent } from "./heating-system-repair/oil-tank-protection-plans/oil-tank-protection-plans.component";
import { OilTankLeakRepairComponent } from "./heating-system-repair/oil-tank-leak-repair/oil-tank-leak-repair.component";
import { OilTankReplacementComponent } from "./heating-system-repair/oil-tank-replacement/oil-tank-replacement.component";
import { FuelOilTankInstallationDiagramComponent } from "./heating-system-repair/fuel-oil-tank-installation-diagram/fuel-oil-tank-installation-diagram.component";
import { FurnaceRepairComponent } from "./heating-system-repair/furnace-repair/furnace-repair.component";

// heating oil deliveries imports
import { HeatingOilDeliveriesRoutingModule } from "./heating-oil-deliveries/heating-oil-deliveries-routing.module";
// -----------------------------------------components-----------------------------------------
import { CashHeatingOilComponent } from "./heating-oil-deliveries/cash-heating-oil/cash-heating-oil.component";
import { CodFuelComponent } from "./heating-oil-deliveries/cod-fuel/cod-fuel.component";
import { FuelComparisonComponent } from "./heating-oil-deliveries/fuel-comparison/fuel-comparison.component";
import { HeatingOilPriceHistoryComponent } from "./heating-oil-deliveries/heating-oil-price-history/heating-oil-price-history.component";
import { HeatingOilPriceTrendsComponent } from "./heating-oil-deliveries/heating-oil-price-trends/heating-oil-price-trends.component";
import { HeatingOilPricingComponent } from "./heating-oil-deliveries/heating-oil-pricing/heating-oil-pricing.component";
import { HeatingOilComponent } from "./heating-oil-deliveries/heating-oil/heating-oil.component";
import { ComponentsModule } from "../../shared/components/components.module";


@NgModule({
    declarations: [
        // -----------------------------------------main or parents components-----------------------------------------
        BlogComponent,
        OilCentralHeatingComponent,
        HomePageComponent,
        BestPriceCodFuelPageComponent,
        DirectHeatPageComponent,
        EnterZipPageComponent,
        HeatingOilDeliveriesPageComponent,
        HeatingSystemRepairPageComponent,
        OilPricesDeclinePageComponent,
        ZipCodeNotAvailablePageComponent,
        // -----------------------------------------utility components-----------------------------------------
        BreadcrumbsComponent,
        // -----------------------------------------oil central heating-----------------------------------------
        FuelOilFurnaceComponent,
        OilTankChartComponent,
        OilTankGuideComponent,
        FuelOilFurnaceAndBoilerBrandsComponent,
        GranbyVsRothComponent,
        FuelOilFurnaceAndBoilerSizesComponent,
        OilTankGaugeComponent,
        // -----------------------------------------Heating Oil deliveries-----------------------------------------
        HeatingOilComponent,
        CodFuelComponent,
        CashHeatingOilComponent,
        HeatingOilPricingComponent,
        HeatingOilPriceHistoryComponent,
        HeatingOilPriceTrendsComponent,
        FuelComparisonComponent,
        // -----------------------------------------heating system repair-----------------------------------------
        FuelOilTankInstallationDiagramComponent,
        OilTankReplacementComponent,
        FurnaceRepairComponent,
        OilTankLeakRepairComponent,
        OilTankProtectionPlansComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        OilCentralHeatingRoutingModule,
        HeatingSystemRepairRoutingModule,
        HeatingOilDeliveriesRoutingModule,
        BlogRoutingModule,
        ComponentsModule
    ]
})
export class BlogPageModule { }
