import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  ViewChild,
  Inject,
  Renderer2,
  ElementRef,
} from '@angular/core';
import { Router } from '@angular/router';
// import * as HistoricalPriceChart from "../../../assets/js/historical-price-chart.js";
declare var HistoricalPriceChart;
import { ClientApiService } from 'src/app/shared/api/client.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Storage } from "@ionic/storage-angular";
import { environment } from 'src/environments/environment';

import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { DOCUMENT } from '@angular/common';
import { CommonService } from 'src/app/shared/services/common.config';

export interface CustomWindow extends Window {

  customProperty: boolean;
}

@Component({
  selector: 'app-oil-historic-chart',
  templateUrl: './oil-historic-chart.component.pug',
  styleUrls: ['./oil-historic-chart.component.scss'],
})
export class OilHistoricChartComponent implements OnInit {
  firstTimeLoad: boolean = false;
  private window: CustomWindow;
  @ViewChild('histroical-price-chart-oil', { static: false })
  jsonData: any;
  OneYearExample: any = [];
  @Input() data_: any;
  @Input() townData: any;
  @Input() loaded: any;
  @Input() lastUpdate: string = '';
  @Output() oncomponentdataoutpu = new EventEmitter<any>();
  fromDate: any;
  toDate: any;
  Avprice: any;
  email: any;
  public emailForm: FormGroup = null;
  monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'April',
    'May',
    'June',
    'July',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  epochNow: any;
  enableFirstTime = true;
  loadedOnce = true;
  constructor(
    private clientApiService: ClientApiService,
    public http: HttpClient,
    private fb: FormBuilder,
    @Inject(DOCUMENT) private document: Document,
    public config: CommonService,
    private renderer: Renderer2,
    public router: Router
  ) {
    this.epochNow = '16800000000';
    this.window = <any>this.document.defaultView;
    // let img_logo =
    //   'https://media-cdn.heatfleet.com/aa-US-Heating-OIl-Delivery-Map.webp' +
    //   '?tr=w-49,h-30';
  }

  ngOnChanges() {
    if (this.loaded) this.getChartData();
  }
  async ngOnInit() {
    let innerWidth = this.window.innerWidth;

    this.config.innerWidth = innerWidth;

    if (this.config.innerWidth <= 500) {
      this.config.mobile_view = true;
    } else {
      if (!this.firstTimeLoad) {
        let script_id = this.document.getElementById('ze1o');
        let fdm = this.document.getElementsByTagName('script');

        console.log('script_id', script_id);

        if (!script_id) {
          this.firstTimeLoad = true;

          // if (fdm.length == 7) {
          console.log('fdm.length', fdm.length);

          var script = this.renderer.createElement('script');
          script.id = 'ze1o';

          script.src =
            'https://media-cdn.heatfleet.com/historical-price-chart.js';
          this.renderer.appendChild(this.document.body, script);
          // }

          var script2 = this.renderer.createElement('script');
          script2.id = 'ze2o';
          
          script2.src = 'https://d3js.org/d3.v7.min.js';
          this.renderer.appendChild(this.document.body, script2);

          this.config.mobile_view = false;
        }
      }
    }

    const PURE_EMAIL_REGEXP =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    this.emailForm = this.fb.group({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(PURE_EMAIL_REGEXP),
      ]),
    });
  }

  ionViewWillEnter() {
    this.enableFirstTime = true;
  }

  private getUrl(uri: string): string {
    return `${environment.api_url}${uri}`;
  }

  protected getHttpOptions(withoutToken: boolean = false) {
    return {
      headers: new HttpHeaders({
        'X-Api-Key': `${environment.api_key}`,
        'DAVOS-IsMobile': environment.isMobile.toString(),
      }),
    };
  }

  async getChartData() {
    this.loadedOnce = false;
    this.jsonData = this.data_;
    let fromDate = new Date(this.jsonData[0].Date);

    let toDate = new Date(this.jsonData[this.jsonData.length - 1].Date);

    this.Avprice = this.jsonData[this.jsonData.length - 1].heatfleet;

    this.config.storageSave('national_avg_price', this.Avprice);

    this.fromDate =
      this.monthNames[fromDate.getMonth()] + ' ' + fromDate.getUTCDate();
    this.toDate =
      this.monthNames[toDate.getMonth()] + ' ' + toDate.getUTCDate();

    if (this.enableFirstTime) {
      this.enableFirstTime = false;

      setTimeout(() => {
        if (this.jsonData) {
          if (HistoricalPriceChart) {
            var chart = new HistoricalPriceChart({
              el: this.document.getElementById('histroical-price-chart-oil'),
            });

            chart.updateData(this.jsonData);
          }

          return;
        }
      }, 1000);

      // if (this.config.typeParam == 'subType=2') {
      //   // alert(1);
      //   setTimeout(() => {
      //     if (this.jsonData) {
      //       if (HistoricalPriceChart) {
      //         const chart = new HistoricalPriceChart({
      //           el: this.document.getElementById('histroical-price-chart-0'),
      //         });

      //         chart.updateData(this.jsonData);
      //       }

      //       return;
      //     }
      //   }, 1000);
      // } else if (this.config.onlyLanding) {
      //   // alert(3);
      //   setTimeout(() => {
      //     if (this.jsonData) {
      //       if (HistoricalPriceChart) {
      //         const chart = new HistoricalPriceChart({
      //           el: this.document.getElementById('histroical-price-chart-1'),
      //         });

      //         chart.updateData(this.jsonData);
      //       }

      //       return;
      //     }
      //   }, 1000);
      // } else if (!this.config.onlyLanding) {
      //   // alert(2);
      //   setTimeout(() => {
      //     if (this.jsonData) {
      //       if (HistoricalPriceChart) {
      //         const chart = new HistoricalPriceChart({
      //           el: this.document.getElementById('histroical-price-chart'),
      //         });

      //         chart.updateData(this.jsonData);
      //       }

      //       return;
      //     }
      //   }, 1000);
      // }
    }
  }

  async contact() {
    const url = this.getUrl('customer/offer/savecontactdata');

    let form = {
      name: '',
      ownerType: '',
      contactVia: '',
      phoneNumber: '',
      question: '',
      email: this.emailForm.value.email,
    };

    if (this.emailForm.valid == false) {
      this.presentToast('Enter valid email.', 'error');
      return;
    }

    await this.http.post(url, form, this.getHttpOptions()).subscribe((data) => {
      if (data == true) {
        this.emailForm.reset();
        this.presentToast('Thank You for subscribing.', 'successtoast');
      }
    });
  }

  async presentToast(m, style) {
    // commented_v
    // const toast = await this.toastController.create({
    //   message: m,
    //   duration: 2000,
    //   cssClass: style,
    // });
    // toast.present();
  }
}
