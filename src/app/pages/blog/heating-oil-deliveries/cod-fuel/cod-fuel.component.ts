import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../blog.service';

@Component({
  selector: 'app-cod-fuel',
  templateUrl: './cod-fuel.component.html',
  styleUrls: ['./cod-fuel.component.scss'],
})
export class CodFuelComponent implements OnInit {
  constructor(private blogService: BlogService) {}
  ngOnInit(): void {
    this.blogService.breadCrumbsList = [
    
      { title: 'Heating Oil Delivery', url: 'blog/heating-oil-deliveries' },
      {
        title: 'COD Fuel Dealers',
        url: 'blog/heating-oil-deliveries/cod-fuel',
      },
    ];
  }
}
