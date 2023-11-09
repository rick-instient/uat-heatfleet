import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../blog.service';

@Component({
  selector: 'app-oil-tank-gauge',
  templateUrl: './oil-tank-gauge.component.html',
  styleUrls: ['./oil-tank-gauge.component.scss']
})
export class OilTankGaugeComponent implements OnInit{
  constructor(private blogService: BlogService) { }
  ngOnInit(): void {
    this.blogService.breadCrumbsList = [
      { title: "Oil Central Heating", url: "blog/oil-central-heating" },
      { title: "Oil Tank Gauge", url: "blog/oil-central-heating/oil-tank-gauge" },
    ]
  }
}
