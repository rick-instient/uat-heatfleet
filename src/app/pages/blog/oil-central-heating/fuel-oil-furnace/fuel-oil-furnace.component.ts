import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../blog.service';

@Component({
  selector: 'app-fuel-oil-furnace',
  templateUrl: './fuel-oil-furnace.component.html',
  styleUrls: ['./fuel-oil-furnace.component.scss']
})
export class FuelOilFurnaceComponent implements OnInit {
  constructor(private blogService: BlogService) { }
  ngOnInit(): void {
    this.blogService.breadCrumbsList = [
      { title: "Oil Central Heating", url: "blog/oil-central-heating" },
      { title: "Fuel Oil Furnace", url: "blog/oil-central-heating/fuel-oil-furnace" },
    ]
  }
}
