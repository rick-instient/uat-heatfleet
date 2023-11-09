import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../blog.service';

@Component({
  selector: 'app-oil-tank-replacement',
  templateUrl: './oil-tank-replacement.component.html',
  styleUrls: ['./oil-tank-replacement.component.scss'],
})
export class OilTankReplacementComponent implements OnInit {
  constructor(private blogSerive: BlogService) {}
  ngOnInit(): void {
    this.blogSerive.breadCrumbsList = [
      { title: 'Heating System Repair', url: 'blog/heating-system-repair' },
      {
        title: 'Oil Tank Replacement',
        url: 'blog/heating-system-repair/oil-tank-replacement',
      },
    ];
  }
}
