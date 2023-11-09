import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imageResize' 
})
export class ImageResizePipe implements PipeTransform {

  transform(imageUrl: string | undefined): string {
    if (imageUrl) {
      return `${imageUrl}?tr=w-225 225w,${imageUrl}?tr=w-350 350w,${imageUrl}?tr=w-700 700w,${imageUrl}?tr=w-900 900w,${imageUrl}?tr=w-1200 1200w,`;
    }
    return '';
  }

}
