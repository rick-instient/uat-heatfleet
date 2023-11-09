import { Component, Input, OnInit } from '@angular/core';
// import { CommonService } from 'src/app/heatfleet-landing/common.config';

@Component({
  selector: 'app-section-compareprices',
  templateUrl: './section-compareprices.component.html',
  styleUrls: ['./section-compareprices.component.scss'],
})
export class SectionComparepricesComponent implements OnInit {
  @Input() townData: any;
  @Input() city: any;
  @Input() LowValue: any;
  @Input() MaxValue: any;
  @Input() comparePricesText: any;
  @Input() fullServiceCompaniesInUS: any;

  constructor() // public config: CommonService
  {}

  ngOnInit() {}
}
