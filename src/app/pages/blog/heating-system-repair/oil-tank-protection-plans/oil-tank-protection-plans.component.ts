import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../blog.service';

@Component({
  selector: 'app-oil-tank-protection-plans',
  templateUrl: './oil-tank-protection-plans.component.html',
  styleUrls: ['./oil-tank-protection-plans.component.scss'],
})
export class OilTankProtectionPlansComponent implements OnInit {
  constructor(private blogSerive: BlogService) {}
  ngOnInit(): void {
    this.blogSerive.breadCrumbsList = [
      { title: 'Heating System Repair', url: 'blog/heating-system-repair' },
      {
        title: 'Oil Tank Replacement',
        url: 'blog/heating-system-repair/oil-tank-replacement',
      },
      {
        title: 'Oil Tank Protection Plans',
        url: 'blog/heating-system-repair/oil-tank-protection-plans',
      },
    ];
  }
}
