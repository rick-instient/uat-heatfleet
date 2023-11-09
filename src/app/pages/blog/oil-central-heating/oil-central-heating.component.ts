import { Component, OnInit } from '@angular/core';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-oil-central-heating',
  templateUrl: 'oil-central-heating.component.html',
  styleUrls: ['oil-central-heating.component.scss'],
})
export class OilCentralHeatingComponent implements OnInit {
  constructor(private blogService: BlogService) {}
  ngOnInit(): void {
    this.blogService.breadCrumbsList = [
      { title: 'Oil Central Heating', url: 'blog/oil-central-heating' },
    ];
  }
}
