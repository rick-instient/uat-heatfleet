import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../blog.service';

@Component({
  selector: 'app-fuel-oil-furnace-and-boiler-sizes',
  templateUrl: './fuel-oil-furnace-and-boiler-sizes.component.html',
  styleUrls: ['./fuel-oil-furnace-and-boiler-sizes.component.scss']
})
export class FuelOilFurnaceAndBoilerSizesComponent implements OnInit{
  constructor(private blogService: BlogService) { }
  ngOnInit(): void {
    this.blogService.breadCrumbsList = [
      { title: "Oil Central Heating", url: "blog/oil-central-heating" },
      { title: "Fuel Oil Furnace & Boiler Guide", url: "blog/oil-central-heating/fuel-oil-furnace" },
      { title: "Fuel Oil Furnace & Boiler Sizes", url: "blog/oil-central-heating/fuel-oil-furnace-and-boiler-sizes" },
    ]
  }
}
