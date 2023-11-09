import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";


import { PrivacyPolicyPageRoutingModule } from "./privacy-policy-routing.module";

import { PrivacyPolicyPage } from "./privacy-policy.page";
import { ComponentsModule } from "src/app/shared/components/components.module"; 

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PrivacyPolicyPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [PrivacyPolicyPage],
})
export class PrivacyPolicyPageModule {}
