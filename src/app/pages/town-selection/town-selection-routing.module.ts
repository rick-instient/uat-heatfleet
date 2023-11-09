import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { TownSelectionPage } from "./town-selection.page";

const routes: Routes = [
  {
    path: "",
    component: TownSelectionPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TownSelectionPageRoutingModule {}
