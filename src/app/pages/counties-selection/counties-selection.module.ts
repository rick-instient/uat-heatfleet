import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { CountiesSelectionPage } from './counties-selection.page';
import { CountiesSelectionPageRoutingModule } from './counties-selection-routing.module';
import { LazyLoadDirective } from 'src/app/shared/helper/lazy-load.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ComponentsModule,
    CountiesSelectionPageRoutingModule,
  ],
  declarations: [CountiesSelectionPage, LazyLoadDirective],
})
export class CountiesSelectionPageModule {}
