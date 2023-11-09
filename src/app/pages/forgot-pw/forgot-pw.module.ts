import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { SharedModule } from 'src/shared/shared.module';
import { ForgotPwPageRoutingModule } from './forgot-pw-routing.module';
import { ForgotPwPage } from './forgot-pw.page';
import { ComponentsModule } from 'src/app/shared/components/components.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    // IonicModule,
    // ComponentsModule,
    ForgotPwPageRoutingModule,
    // SharedModule,
    ReactiveFormsModule,
    ComponentsModule,
  ],
  declarations: [ForgotPwPage]
})
export class ForgotPwPageModule {}
