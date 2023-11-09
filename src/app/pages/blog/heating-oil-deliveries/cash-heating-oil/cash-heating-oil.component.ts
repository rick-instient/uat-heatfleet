import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../blog.service';

@Component({
  selector: 'app-cash-heating-oil',
  templateUrl: './cash-heating-oil.component.html',
  styleUrls: ['./cash-heating-oil.component.scss'],
})
export class CashHeatingOilComponent implements OnInit {
  constructor(private blogService: BlogService) {}
  ngOnInit(): void {
    this.blogService.breadCrumbsList = [
      { title: 'Heating Oil Delivery', url: 'blog/heating-oil-deliveries' },
      {
        title: 'COD Fuel Dealers',
        url: 'blog/heating-oil-deliveries/cod-fuel',
      },
      {
        title: 'Cash Heating Oil Delivery',
        url: 'blog/heating-oil-deliveries/cash-heating-oil/',
      },
    ];
  }
}
