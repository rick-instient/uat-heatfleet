import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/shared/services/common.config';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.page.html',
  styleUrls: ['./faqs.page.scss'],
})
export class FaqsPage implements OnInit {
  epochNow: any;
  constructor(
    private title: Title,
    private meta: Meta,
    public router: Router,
    public config: CommonService
  ) {
    let title_ = 'Frequently Asked Questions | HeatFleet.com';
    this.title.setTitle(title_);
    let description =
      'Answers to all your frequently asked questions about oil delivery, heating repair and finding the best local oil company oil prices per gallon today.';
    this.meta.updateTag({
      name: 'description',
      content: description,
    });

    if (!environment.production) {
      this.meta.updateTag({
        name: 'robots',
        content: 'noindex, nofollow',
      });
    } else {
      this.meta.updateTag({
        name: 'robots',
        content: 'all',
      });
    }
    this.meta.addTags([
      { property: 'og:type', content: 'website' },
      { property: 'og:title', content: title_ },
      { property: 'og:url', content: this.router.url },
      { property: 'twitter:card', content: 'summary_large_image' },
      { property: 'twitter:description', content: description },
      { property: 'twitter:title', content: title_ },
      { property: 'twitter:site', content: this.router.url },
      {
        property: 'og:image',
        content:
          '/assets/icons/9m-Heat-Fleet-Heating-Oil-Logo.svg',
      },
      {
        property: 'twitter:image',
        content:
          '/assets/icons/9m-Heat-Fleet-Heating-Oil-Logo.svg',
      },
    ]);

    this.epochNow = '16800000000';
  }

  ngOnInit() {
    this.config.updateCanonicalUrl('https://heatfleet.com' + this.router.url);

    let ans1 =
      'Will-call, COD fuel company, and cash heating oil order are all equivalent terms meaning that you, the homeowner, occasionally check your oil gauge and place heating oil delivery orders when you&rsquo;re running low';
    let ans2 =
      'Automatic heating oil delivery means that your heating oil company uses special software to estimate your oil usage, and the company delivers oil when the software says that you are probably running low on oil. Typically, homeowners order automatic delivery in conjunction with a 1-year oil delivery contract, but many companies offer automatic delivery without a contract. The benefit of automatic delivery is the convenience of never needing to check your oil gauge. The drawback of automatic delivery is that you can&rsquo;t always get the best heating oil prices because you can&rsquo;t price-shop for each delivery.';
    let faq = [
      {
        '@context': 'http:\u002F\u002Fschema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What do &quot;Will-call&quot;, &quot;COD fuel company&quot;, and &quot;cash heating oil order&quot; mean?',
            acceptedAnswer: {
              '@type': 'Answer',
              text:
                "\u003Cdiv class='faqItem'\u003E\u003Cdiv class='answer'\u003E" +
                ans1 +
                '\u003C\u002Fa\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E',
            },
          },
          {
            '@type': 'Question',
            name: 'What does &quot;Automatic Delivery&quot; mean?',
            acceptedAnswer: {
              '@type': 'Answer',
              text:
                "\u003Cdiv class='faqItem'\u003E\u003Cdiv class='answer'\u003E" +
                ans2 +
                '\u003C\u002Fa\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E',
            },
          },
        ],
      },
    ];

    // this.config.schema.push(faq);

    this.config.insertSchema(faq, 'structured-data-org');
  }
}
