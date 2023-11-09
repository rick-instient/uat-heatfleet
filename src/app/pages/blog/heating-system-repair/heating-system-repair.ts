import { Component, OnInit } from '@angular/core';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-heating-system-repair',
  templateUrl: './heating-system-repair.page.html',
  styleUrls: ['./heating-system-repair.page.scss'],
})
export class HeatingSystemRepairPageComponent implements OnInit {
  constructor(private blogSerive: BlogService) {}
  ngOnInit(): void {
    this.blogSerive.breadCrumbsList = [
      { title: 'Heating System Repair', url: 'blog/heating-system-repair' },
    ];
  }
}
