import { Component, Input, OnInit } from '@angular/core';
import { CommonService } from '../../services/common.config';

@Component({
  selector: 'app-section-faqs',
  templateUrl: './section-faqs.component.html',
  styleUrls: ['./section-faqs.component.scss'],
})
export class SectionFaqsComponent implements OnInit {
  public isMenuOpen: boolean = false;
  @Input() faqsContentTown;
  @Input() townData: any;
  @Input() city: any;
  epochNow: any;

  constructor(public config: CommonService) {
    this.townData = true;
  }

  ngOnChanges() {
    // if (this.faqsContentTown) {
    // this.townData = true;
    // this.config.faqsContent = this.faqsContentTown;
    // this.config.faqsContent.forEach((el) => {
    // //   el.checked = false;
    // });
    // }
  }

  ngOnInit() {
    this.epochNow = '16800000000';

    // if (!this.townData && !this.faqsContentTown && !this.config.landing) {

    // }
  }

  public toggleAccordion(n): void {
    this.config.faqsContent.forEach((element_) => {
      if (element_.question === n.question) {
        if (element_.checked == true) {
          element_.checked = false;
          return;
        } else {
          element_.checked = true;
          return;
        }
      }
    });
  }

  public broadcastName(question: string): void {
    //  ..
  }

  enable(n) {
    if (n.checked == true) {
      n.checked = false;
    } else {
      n.checked = true;
    }
  }

  disable(n) {
    n.checked = false;
  }
}
