import { NgModule } from '@angular/core';
import { ImageResizePipe } from './pipes';

@NgModule({
  declarations: [
    ImageResizePipe
  ],
  exports: [
    ImageResizePipe
  ]
})
export class PipeAndDirectiveModule { }