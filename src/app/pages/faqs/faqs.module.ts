import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FaqsPageRoutingModule } from './faqs-routing.module';

import { FaqsPage } from './faqs.page';
import { ComponentsModule } from 'src/app/shared/components/components.module';

@NgModule({
  imports: [CommonModule, FormsModule, FaqsPageRoutingModule, ComponentsModule],
  declarations: [FaqsPage],
})
export class FaqsPageModule {}
