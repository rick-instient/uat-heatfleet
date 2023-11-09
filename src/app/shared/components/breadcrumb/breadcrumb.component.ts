import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { SharedService } from '../../services/shared-service.service';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent {

  breadcrumbs: any = [];
  bsAltLine: string = 'fuel oil guide';
  pageDetailsSub: Subscription;
  isLoading: boolean = true;

  constructor(public sharedService: SharedService) { }

  ngOnInit() {
    this.getPageDetailsApiData();
  }

  getPageDetailsApiData() {
    this.pageDetailsSub = this.sharedService.getPageDetailsApiData$.subscribe(value => {
      if (Object.keys(value).length != 0) {
        console.log("breadcrumbs", value.breadcrumbs);
        this.isLoading = false;
        this.breadcrumbs = value.breadcrumbs;
        this.bsAltLine = value.bsAltLine;
      }
    });
  }

  ngOnDestroy() {
    if (this.pageDetailsSub) {
      this.pageDetailsSub.unsubscribe();
    }
  }
}
