import { Component, Input, OnInit, HostListener, Inject } from '@angular/core';
import { CommonService } from '../../services/common.config';
import { DOCUMENT } from '@angular/common';

export interface CustomWindow extends Window {

  customProperty: boolean;
}


@Component({
  selector: 'app-section-why2',
  templateUrl: './section-why2.component.html',
  styleUrls: ['./section-why2.component.scss'],
})
export class SectionWhy2Component implements OnInit {
  epochNow: any;
  private window: CustomWindow;
  @Input() state: any;
  @Input() townData: any;
  @Input() city: any;
  innerWidth: number;

  constructor(public config: CommonService, @Inject(DOCUMENT) private document: Document) {
    this.epochNow = '16800000000';
    this.window = <any>this.document.defaultView;
  }

  ngOnInit() {
    this.innerWidth = this.window.innerWidth;
  }

  ngOnChanges() {}

}
