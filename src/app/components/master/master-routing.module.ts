import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HeatingOilComponent } from './heating-oil/heating-oil.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactComponent } from './contact/contact.component';
import { FaqsComponent } from './faqs/faqs.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { OilDeliveryComponent } from './oil-delivery/oil-delivery.component';
import { HeatingOilPricesComponent } from './heating-oil-prices/heating-oil-prices.component';
import { OilCompaniesComponent } from './oil-companies/oil-companies.component';
import { LocationTypeComponent } from './location-type/location-type.component';


const routes: Routes = [
  { path: '', component: HomeComponent },

  // Basic Routes
  { path: 'home.html', component: HomeComponent },
  { path: 'about-us.html', component: AboutUsComponent },
  { path: 'contact.html', component: ContactComponent },
  { path: 'faqs.html', component: FaqsComponent },
  { path: 'privacy-policy.html', component: PrivacyPolicyComponent },
  { path: 'terms-conditions.html', component: TermsConditionsComponent },
  { path: 'sign-in.html', component: SignInComponent },

  // Query Based Routes
  { path: 'heating_oil.html', component: HeatingOilComponent },
  { path: 'heating_oil/:location', component: LocationTypeComponent },

  { path: 'oil_delivery.html', component: OilDeliveryComponent },
  { path: 'oil_delivery/:location', component: LocationTypeComponent },

  { path: 'heating_oil_prices.html', component: HeatingOilPricesComponent },
  { path: 'heating_oil_prices/:location', component: LocationTypeComponent },

  { path: 'oil_companies.html', component: OilCompaniesComponent },
  { path: 'oil_companies/:location', component: LocationTypeComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class MasterRoutingModule { }
