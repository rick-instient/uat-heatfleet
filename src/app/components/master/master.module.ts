import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterRoutingModule } from './master-routing.module';
import { MasterComponent } from './master.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { HeatingOilComponent } from './heating-oil/heating-oil.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { SectionThirdComponent } from './about-us/section-third/section-third.component';
import { SectionSecondComponent } from './about-us/section-second/section-second.component';
import { SectionOneComponent } from './about-us/section-one/section-one.component';
import { SectionImgComponent } from './about-us/section-img/section-img.component';
import { AdvisorsSectionComponent } from './about-us/advisors-section/advisors-section.component';
import { ContactComponent } from './contact/contact.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FaqsComponent } from './faqs/faqs.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { StateSelectionComponent } from './state-selection/state-selection.component';
import { StateProfileComponent } from './state-profile/state-profile.component';
import { TownProfileComponent } from './town-profile/town-profile.component';
import { CompanyProfileComponent } from './company-profile/company-profile.component';
import { CountiesSelectionComponent } from './counties-selection/counties-selection.component';
import { TownSelectionComponent } from './town-selection/town-selection.component';
import { OilDeliveryComponent } from './oil-delivery/oil-delivery.component';
import { HeatingOilPricesComponent } from './heating-oil-prices/heating-oil-prices.component';
import { OilCompaniesComponent } from './oil-companies/oil-companies.component';
import { LocationTypeComponent } from './location-type/location-type.component';
import { PipeAndDirectiveModule } from 'src/app/shared/pipes/pipes.module';

@NgModule({
  declarations: [
    MasterComponent,
    HeaderComponent,
    FooterComponent,
    NotFoundComponent,
    HomeComponent,
    HeatingOilComponent,
    AboutUsComponent,
    SectionThirdComponent,
    SectionSecondComponent,
    SectionOneComponent,
    SectionImgComponent,
    AdvisorsSectionComponent,
    ContactComponent,
    FaqsComponent,
    PrivacyPolicyComponent,
    TermsConditionsComponent,
    SignInComponent,
    StateSelectionComponent,
    StateProfileComponent,
    TownProfileComponent,
    CompanyProfileComponent,
    CountiesSelectionComponent,
    TownSelectionComponent,
    OilDeliveryComponent,
    HeatingOilPricesComponent,
    OilCompaniesComponent,
    LocationTypeComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MasterRoutingModule,
    ComponentsModule,
    PipeAndDirectiveModule,
  ]
})
export class MasterModule { }
