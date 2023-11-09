import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-delivery-map',
  templateUrl: './delivery-map.component.html',
  styleUrls: ['./delivery-map.component.scss'],
})
export class DeliveryMapComponent {
  townmapImage = true;

  @Input() service_image_url: any;
  @Input() service_alt: any;
  @Input() service_title: any;

  onImgError(event) {
    this.townmapImage = false;
    event.target.src = '/assets/icon/placeholder-rectangle.png';
  }
}
