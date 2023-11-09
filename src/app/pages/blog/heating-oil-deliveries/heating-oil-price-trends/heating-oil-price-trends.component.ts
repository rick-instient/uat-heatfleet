import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../blog.service';

@Component({
  selector: 'app-heating-oil-price-trends',
  templateUrl: './heating-oil-price-trends.component.html',
  styleUrls: ['./heating-oil-price-trends.component.scss'],
})
export class HeatingOilPriceTrendsComponent implements OnInit {
  constructor(private blogService: BlogService) {}
  ngOnInit(): void {
    this.blogService.breadCrumbsList = [
      { title: 'Heating Oil Delivery', url: 'blog/heating-oil-deliveries' },
      {
        title: 'Heating Oil Price Trends',
        url: 'blog/heating-oil-deliveries/home-heating-oil-price-trends',
      },
    ];
  }
}
