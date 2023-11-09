import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { ServiceSelectionPage } from "./service-selection.page";
import { ServiceSelectionPageRoutingModule } from "./service-selection-routing.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ServiceSelectionPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [ServiceSelectionPage],
  providers: [],
})
export class ServiceSelectionPageModule {}
