import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-section-third',
  templateUrl: './section-third.component.html',
  styleUrls: ['./section-third.component.scss'],
})
export class SectionThirdComponent implements OnInit {
  epochNow: any;
  constructor() {
    this.epochNow = '16800000000';
  }

  ngOnInit() {}
}
