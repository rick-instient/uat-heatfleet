import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../blog.service';

@Component({
  selector: 'app-heating-oil-price-history',
  templateUrl: './heating-oil-price-history.component.html',
  styleUrls: ['./heating-oil-price-history.component.scss'],
})
export class HeatingOilPriceHistoryComponent implements OnInit {
  constructor(private blogService: BlogService) {}
  ngOnInit(): void {
    this.blogService.breadCrumbsList = [
      { title: 'Heating Oil Delivery', url: 'blog/heating-oil-deliveries' },
      {
        title: 'Heating Oil Price Trends',
        url: 'blog/heating-oil-deliveries/home-heating-oil-price-trends',
      },
      {
        title: 'Heating Oil Price History',
        url: 'blog/heating-oil-deliveries/heating-oil-price-history',
      },
    ];
  }
}
