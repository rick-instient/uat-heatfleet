import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { StateSelectionPage } from "./state-selection.page";

const routes: Routes = [
  {
    path: "",
    component: StateSelectionPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StateSelectionPageRoutingModule {}
