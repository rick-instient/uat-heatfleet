import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../services/common.config';

@Component({
  selector: 'app-section-howitworks',
  templateUrl: './section-howitworks.component.html',
  styleUrls: ['./section-howitworks.component.scss'],
})
export class SectionHowitworksComponent implements OnInit {
  epochNow: any;
  itemList = [
    {
      item: 'You specify your order details.',
    },
    {
      item: 'You specify your order details.',
    },
    {
      item: 'You specify your order details.',
    },
    {
      item: 'You specify your order details.',
    },
    {
      item: 'You specify your order details.',
    },
  ];

  constructor(public config: CommonService) {
    this.epochNow = '16800000000';
  }

  ngOnInit() {}
}
