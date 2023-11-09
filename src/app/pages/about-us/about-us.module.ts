import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { AboutUsPageRoutingModule } from "./about-us-routing.module";

import { AboutUsPage } from "./about-us.page";
import { ComponentsModule } from "src/app/shared/components/components.module";
import { SectionImgComponent } from "../../components/master/about-us/section-img/section-img.component";
import { SectionOneComponent } from "../../components/master/about-us/section-one/section-one.component";
import { SectionSecondComponent } from "../../components/master/about-us/section-second/section-second.component";
import { SectionThirdComponent } from "../../components/master/about-us/section-third/section-third.component";
import { AdvisorsSectionComponent } from "../../components/master/about-us/advisors-section/advisors-section.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AboutUsPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [
    AboutUsPage,
    // SectionImgComponent,
    // SectionOneComponent,
    // SectionSecondComponent,
    // SectionThirdComponent,
    // AdvisorsSectionComponent,
  ],
})
export class AboutUsPageModule { }
