import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../blog.service';

@Component({
  selector: 'app-oil-tank-guide',
  templateUrl: './oil-tank-guide.component.html',
  styleUrls: ['./oil-tank-guide.component.scss'],
})
export class OilTankGuideComponent implements OnInit {
  constructor(private blogService: BlogService) {}
  ngOnInit(): void {
    this.blogService.breadCrumbsList = [
      { title: 'Oil Central Heating', url: 'blog/oil-central-heating' },
      {
        title: 'Oil Tank Guide',
        url: 'blog/oil-central-heating/oil-tank-guide',
      },
    ];
  }
}
