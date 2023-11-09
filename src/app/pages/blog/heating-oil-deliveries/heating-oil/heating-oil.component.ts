import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../blog.service';

@Component({
  selector: 'app-heating-oil',
  templateUrl: './heating-oil.component.html',
  styleUrls: ['./heating-oil.component.scss'],
})
export class HeatingOilComponent implements OnInit {
  constructor(private blogSerive: BlogService) {}
  ngOnInit(): void {
    this.blogSerive.breadCrumbsList = [
      { title: 'Heating Oil Delivery', url: 'blog/heating-oil-deliveries' },
      {
        title: '#2 Heating Oil',
        url: 'blog/heating-oil-deliveries/2-heating-oil-2',
      },
    ];
  }
}
