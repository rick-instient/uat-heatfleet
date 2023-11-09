import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../blog.service';

@Component({
  selector: 'app-heating-oil-pricing',
  templateUrl: './heating-oil-pricing.component.html',
  styleUrls: ['./heating-oil-pricing.component.scss'],
})
export class HeatingOilPricingComponent implements OnInit {
  constructor(private blogService: BlogService) {}
  ngOnInit(): void {
    this.blogService.breadCrumbsList = [
      { title: 'Heating Oil Delivery', url: 'blog/heating-oil-deliveries' },
      {
        title: 'Heating Oil Pricing',
        url: 'blog/heating-oil-deliveries/heating-oil-pricing-payment-plans',
      },
    ];
  }
}
