import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { ComponentsModule } from 'src/app/shared/components/components.module';

// import { ComponentsModule } from "../../components/components.module";
// import { SharedModule } from "src/shared/shared.module";
import { StateSelectionPage } from "./state-selection.page";
import { StateSelectionPageRoutingModule } from "./state-selection-routing.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ComponentsModule,
    StateSelectionPageRoutingModule,
  ],
  declarations: [StateSelectionPage],
})
export class StateSelectionPageModule {}
