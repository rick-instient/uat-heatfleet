import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../blog.service';

@Component({
  selector: 'app-oil-tank-leak-repair',
  templateUrl: './oil-tank-leak-repair.component.html',
  styleUrls: ['./oil-tank-leak-repair.component.scss'],
})
export class OilTankLeakRepairComponent implements OnInit {
  constructor(private blogSerive: BlogService) {}
  ngOnInit(): void {
    this.blogSerive.breadCrumbsList = [
      { title: 'Heating System Repair', url: 'blog/heating-system-repair' },
      {
        title: 'Oil Tank Replacement',
        url: 'blog/heating-system-repair/oil-tank-replacement',
      },
      {
        title: 'Oil Tank Leak Repair',
        url: 'blog/heating-system-repair/oil-tank-leak-repair',
      },
    ];
  }
}
