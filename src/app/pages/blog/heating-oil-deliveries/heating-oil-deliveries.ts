import { Component, OnInit } from '@angular/core';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-heating-oil-deliveries',
  templateUrl: './heating-oil-deliveries.page.html',
  styleUrls: ['./heating-oil-deliveries.page.scss'],
})
export class HeatingOilDeliveriesPageComponent implements OnInit {
  constructor(private blogSerive: BlogService) {}
  ngOnInit(): void {
    this.blogSerive.breadCrumbsList = [
      // { title: 'infoCenter', url: 'blog' },
      { title: 'Heating Oil Delivery', url: 'blog/heating-oil-deliveries' },
    ];
  }
}
