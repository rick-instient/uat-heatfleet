import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";


import { LoginClientPage } from "./login-client.page";
import { LoginPageClientRoutingModule } from "./login-client.routing.module";
import { ComponentsModule } from "src/app/shared/components/components.module";
// import { AuthModule } from "src/shared/authentication/auth.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ComponentsModule,
    LoginPageClientRoutingModule,
    // AuthModule,
  ],
  declarations: [LoginClientPage],
})
export class LoginClientModule {}
