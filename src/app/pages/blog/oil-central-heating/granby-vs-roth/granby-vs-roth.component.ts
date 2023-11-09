import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../blog.service';

@Component({
  selector: 'app-granby-vs-roth',
  templateUrl: './granby-vs-roth.component.html',
  styleUrls: ['./granby-vs-roth.component.scss']
})
export class GranbyVsRothComponent implements OnInit {
  constructor(private blogService: BlogService) { }
  ngOnInit(): void {
    this.blogService.breadCrumbsList = [
      { title: "Oil Central Heating", url: "blog/oil-central-heating" },
      { title: "Granby vs Roth", url: "blog/oil-central-heating/granby-vs-roth" },
    ]
  }
}
