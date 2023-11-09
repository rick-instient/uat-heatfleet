import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../blog.service';

@Component({
  selector: 'app-oil-tank-chart',
  templateUrl: './oil-tank-chart.component.html',
  styleUrls: ['./oil-tank-chart.component.scss']
})
export class OilTankChartComponent implements OnInit{
  constructor(private blogService: BlogService) { }
  ngOnInit(): void {
    this.blogService.breadCrumbsList = [
      { title: "Oil Central Heating", url: "blog/oil-central-heating" },
      { title: "Oil Tank Chart", url: "blog/oil-central-heating/oil-tank-chart" },
    ]
  }
}
