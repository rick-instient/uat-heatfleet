import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventBus } from './eventbus';

// import { InformationComponent } from './components/information/information-component';
// import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
// import { DefaultImageDirective } from './default-image.directive';
// import { DateFromUtcPipe } from './pipes/datefromutc.pipe';
// import { LastDigitPipe } from './pipes/lastdigit.pipe';
// import { PriceDigitPipe } from './pipes/pricedigit.pipe';
// import { PhonePipe } from './pipes/phone.pipe';
@NgModule({
  declarations: [
    // ErrorDialogComponent,
    // InformationComponent,
    // DefaultImageDirective,
    // DateFromUtcPipe,
    // PhonePipe,
    // LastDigitPipe,
    // PriceDigitPipe,
  ],
  // entryComponents: [],
  imports: [
    CommonModule,
    //  ResponsiveModule.forRoot()
  ],
  exports: [
    // InformationComponent,
    // ErrorDialogComponent,
    // DefaultImageDirective,
    // DateFromUtcPipe,
    // LastDigitPipe,
    // PriceDigitPipe,
    // PhonePipe,
  ],
  providers: [EventBus],
  bootstrap: [],
})
export class SharedModule {}
