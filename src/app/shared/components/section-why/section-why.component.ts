import { Component, Input, OnInit, HostListener, Inject } from '@angular/core';
import { CommonService } from '../../services/common.config';
import { DOCUMENT } from '@angular/common';


export interface CustomWindow extends Window {

  customProperty: boolean;
}

@Component({
  selector: 'app-section-why',
  templateUrl: './section-why.component.html',
  styleUrls: ['./section-why.component.scss'],
})


export class SectionWhyComponent implements OnInit {
  @Input() townData: any;
  @Input() city: any;
  innerWidth: number; 
  private window: CustomWindow;
  epochNow: any;
  sectionContent = [
    {
      title: 'Quality Oil',
    },
    {
      title: 'On-time delivery',
    },
    {
      title: 'No contracts',
    },
    {
      title: 'Secure ordering',
    },
    {
      title: 'Trusted local providers',
    },
  ];

  constructor(public config: CommonService,  @Inject(DOCUMENT) private document: Document) {
    this.epochNow = '16800000000';
    this.window = <any>this.document.defaultView;
  }

  ngOnChanges() {
    if (this.city) {
      this.sectionContent = [
        {
          title: 'Quality Oil',
        },
        {
          title: 'On-time delivery',
        },
        {
          title: 'No contracts',
        },
        {
          title: 'Trusted ' + this.city + ' providers',
        },
      ];
    }
  }
  ngOnInit() {
    this.innerWidth = this.window.innerWidth;
  }

}
