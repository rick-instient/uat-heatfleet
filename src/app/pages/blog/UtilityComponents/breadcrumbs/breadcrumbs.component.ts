import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../blog.service';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit {
  breadCrumbsList!: Array<{ title: String, url: String }>
  constructor(private blogService: BlogService) {
    this.breadCrumbsList = []
    // {title:"infoCenter", url:"blog"},{title:"Oil Central Heating", url:"blog/oil-central-heating"}
  }
  ngOnInit(): void {
    this.breadCrumbsList = this.blogService.breadCrumbsList;
  }
}
