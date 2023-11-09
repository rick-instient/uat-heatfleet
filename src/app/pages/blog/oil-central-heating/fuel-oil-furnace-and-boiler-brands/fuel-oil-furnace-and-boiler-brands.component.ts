import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../blog.service';

@Component({
  selector: 'app-fuel-oil-furnace-and-boiler-brands',
  templateUrl: './fuel-oil-furnace-and-boiler-brands.component.html',
  styleUrls: ['./fuel-oil-furnace-and-boiler-brands.component.scss']
})
export class FuelOilFurnaceAndBoilerBrandsComponent implements OnInit {
  constructor(private blogService: BlogService) { }
  ngOnInit(): void {
    this.blogService.breadCrumbsList = [
      { title: "Oil Central Heating", url: "blog/oil-central-heating" },
      { title: "Fuel Oil Furnace & Boiler Guide", url: "blog/oil-central-heating/fuel-oil-furnace" },
      { title: "Fuel Oil Furnace & Boiler Brands", url: "blog/oil-central-heating/fuel-oil-furnace-and-boiler-brands" },
    ]
  }
}
