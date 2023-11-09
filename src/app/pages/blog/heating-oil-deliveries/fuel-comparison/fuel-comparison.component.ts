import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../blog.service';

@Component({
  selector: 'app-fuel-comparison',
  templateUrl: './fuel-comparison.component.html',
  styleUrls: ['./fuel-comparison.component.scss'],
})
export class FuelComparisonComponent implements OnInit {
  constructor(private blogService: BlogService) {}
  ngOnInit(): void {
    this.blogService.breadCrumbsList = [
     
      { title: 'Heating Oil Delivery', url: 'blog/heating-oil-deliveries' },
      {
        title: 'Home Heating Fuel Comparison',
        url: 'blog/heating-oil-deliveries/fuel-comparison-propane-vs-natural-gas',
      },
    ];
  }
}
