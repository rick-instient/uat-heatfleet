import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../blog.service';

@Component({
  selector: 'app-furnace-repair',
  templateUrl: './furnace-repair.component.html',
  styleUrls: ['./furnace-repair.component.scss'],
})
export class FurnaceRepairComponent implements OnInit {
  constructor(private blogSerive: BlogService) {}
  ngOnInit(): void {
    this.blogSerive.breadCrumbsList = [
      { title: 'Heating System Repair', url: 'blog/heating-system-repair' },
      {
        title: 'Furnace Repair',
        url: 'blog/heating-system-repair/furnace-repair',
      },
    ];
  }
}
