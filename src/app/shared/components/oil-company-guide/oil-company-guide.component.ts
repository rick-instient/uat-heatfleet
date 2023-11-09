import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-oil-company-guide',
  templateUrl: './oil-company-guide.component.html',
  styleUrls: ['./oil-company-guide.component.scss'],
})
export class OilCompanyGuideComponent implements OnChanges {
  // @Input() townDetails: any;
  @Input() isState: boolean;
  @Input() oilCompaniesData: any;
  @Input() townPage: any;
  @Input() isLandingPage: boolean = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (this.isLandingPage) {
      this.oilCompaniesData.location = 'U.S.';
    }
  }
}
