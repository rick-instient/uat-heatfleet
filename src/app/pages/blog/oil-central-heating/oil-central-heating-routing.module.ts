import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FuelOilFurnaceComponent } from './fuel-oil-furnace/fuel-oil-furnace.component';
import { OilCentralHeatingComponent } from './oil-central-heating.component';
import { OilTankChartComponent } from './oil-tank-chart/oil-tank-chart.component';
import { OilTankGuideComponent } from './oil-tank-guide/oil-tank-guide.component';
import { FuelOilFurnaceAndBoilerBrandsComponent } from './fuel-oil-furnace-and-boiler-brands/fuel-oil-furnace-and-boiler-brands.component';
import { GranbyVsRothComponent } from './granby-vs-roth/granby-vs-roth.component';
import { FuelOilFurnaceAndBoilerSizesComponent } from './fuel-oil-furnace-and-boiler-sizes/fuel-oil-furnace-and-boiler-sizes.component';
import { OilTankGaugeComponent } from './oil-tank-gauge/oil-tank-gauge.component';


const routes: Routes = [
    {
        path: 'oil-central-heating',
        component: OilCentralHeatingComponent
    },
    {
        path: 'oil-central-heating/fuel-oil-furnace',
        component: FuelOilFurnaceComponent
    },
    {
        path: 'oil-central-heating/oil-tank-chart',
        component: OilTankChartComponent
    },
    {
        path: 'oil-central-heating/oil-tank-guide',
        component: OilTankGuideComponent
    },
    {
        path: 'oil-central-heating/fuel-oil-furnace-and-boiler-brands',
        component: FuelOilFurnaceAndBoilerBrandsComponent
    },
    {
        path: 'oil-central-heating/granby-vs-roth',
        component: GranbyVsRothComponent
    },
    {
        path: 'oil-central-heating/fuel-oil-furnace-and-boiler-sizes',
        component: FuelOilFurnaceAndBoilerSizesComponent
    },
    {
        path: 'oil-central-heating/oil-tank-gauge',
        component: OilTankGaugeComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OilCentralHeatingRoutingModule { }
