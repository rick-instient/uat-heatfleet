import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  ViewChild,
  ElementRef,
  Inject,
  Renderer2,
} from '@angular/core';
// import * as HistoricalPriceChart from '../../../../assets/js/historical-price-chart.js';
declare var HistoricalPriceChart;
import { ClientApiService } from 'src/app/shared/api/client.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Storage } from "@ionic/storage-angular";
import { environment } from 'src/environments/environment';
// import { CookieHelper } from '../../../../shared/cookie-helper';
// import { ToastController } from '@ionic/angular';
// import { CommonService } from '../../../heatfleet-landing/common.config';
import { ActivatedRoute, Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { CommonService } from 'src/app/shared/services/common.config';
export interface CustomWindow extends Window {

  customProperty: boolean;
}

@Component({
  selector: 'app-town-historic-chart',
  templateUrl: './town-historic-chart.component.html',
  styleUrls: ['./town-historic-chart.component.scss'],
})
export class TownHistoricChartComponent implements OnInit {
  private window: CustomWindow;
  public emailForm: FormGroup = null;
  @ViewChild('histroical-price-chart-0') myDiv0: ElementRef;
  @ViewChild('histroical-price-chart-2') myDiv: ElementRef;
  @ViewChild('histroical-price-chart-3') myDiv2: ElementRef;
  jsonData: any;
  OneYearExample: any = [];
  @Input() data_: any;
  @Input() townData: any;
  @Input() city: any;
  @Input() state: any;
  @Input() loaded: any;
  @Input() loadChart: any;
  @Input() loadCompanyChart: any;
  @Input() companyId: any;

  lastUpdate: any;

  @Output() oncomponentdataoutpu = new EventEmitter<any>();
  @Output() townAverage = new EventEmitter<any>();

  fromDate: any;
  toDate: any;
  Avprice: any;
  email: any;
  showChart = false;
  epochNow: any;
  firstTimeLoad = false;
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

  constructor(
    private clientApiService: ClientApiService,
    public http: HttpClient,
    // private storage: Storage,
    // private cookieHelper: CookieHelper,
    // public toastController: ToastController,
    public config: CommonService,
    public router: Router,
    @Inject(DOCUMENT) private document: Document,
    private fb: FormBuilder,
    // @Inject(WINDOW) public window: Window,
    private renderer: Renderer2,

  ) {
    this.window = <any>this.document.defaultView;
    this.epochNow = '16800000000';
  }

  async ngOnInit() {
    let innerWidth = this.window.innerWidth;

    this.config.innerWidth = innerWidth;

    if (this.config.innerWidth <= 500) {
      this.config.mobile_view = true;
    } else {
      if (!this.firstTimeLoad) {
        let script_id = this.document.getElementById('ze1');

        if (script_id == null) {
          this.firstTimeLoad = true;
          var script = this.renderer.createElement('script');
          script.id = 'ze1';
          script.src =
            //  '../../../../assets/js/historical-price-chart.js';
            'https://media-cdn.heatfleet.com/historical-price-chart.js';
          this.renderer.appendChild(this.document.body, script);

          var script2 = this.renderer.createElement('script');
          script2.id = 'ze2';
          
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
    this.showChart = false;

    this.firstTimeLoad = false;
  }

  private getUrl(uri: string): string {
    return `${environment.api_url}${uri}`;
  }

  protected getHttpOptions(withoutToken: boolean = false) {
    const token = environment.token;

    return {
      headers: new HttpHeaders({
        'X-Api-Key': `${environment.api_key}`,
        'DAVOS-IsMobile': environment.isMobile.toString(),
      }),
    };
  }

  ngOnChanges() {
    if (this.loaded) {
      this.firstTimeLoad = false;

      this.getChartData();
    }

    if (this.loadChart) {
      this.getChartData();
    }
    if (this.loadCompanyChart) {
      this.getChartData3();
    }
  }

  async getChartData() {
    var input = this.router.url;

    var fields = input.split('/')[2].split('-');

    // var field2 = fields[2];

    if (this.loadChart) {
      var field_ = input.split('/');
      var field_ = field_[2].split('-');

      var fl = field_[0];

      var url = this.getUrl('customer/offer/get-price-statewise?hash=' + fl);
    } else {
      var field4 = input.split('/')[2].split('-')[0];

      var url = this.getUrl('customer/offer/get-price-townwise?hash=' + field4);
    }

    this.http.get(url, this.getHttpOptions()).subscribe(
      (data) => {
        if (this.townData) {
          if (this.loadChart) {
            var dta: any = data;

            if (dta.length) {
              this.showChart = true;
            }
          } else {
            var dta = data['priceData'];

            if (data['priceData'].length) {
              this.showChart = true;
            }
          }
        } else {
          var dta: any = data;
        }
        // var dta = this.m

        this.config.pricesData = dta;

        if (dta.length && dta) {
          let last: any = dta[dta.length - 1];

          if (this.loadChart) {
            this.lastUpdate = last.createdat;
          } else {
            if (this.townData != undefined) {
              this.lastUpdate = last.date;
            }
          }
        }
        if (this.showChart) {
          // }

          var newArray = JSON.parse(JSON.stringify(dta)).map((o) => {
            var today = new Date(o.date);

            var year = today.getFullYear();
            var month = today.getMonth() + 1;
            var day = today.getDate();
            let len = JSON.stringify(month).length;

            var newMonth: any;

            if (len == 1) {
              newMonth = JSON.stringify(0) + month;
            } else {
              newMonth = month;
            }

            let default_date =
              newMonth + '/' + JSON.stringify(day) + '/' + JSON.stringify(year);

            return {
              heatfleet: o.price,
              Date: default_date,
            };
          });

          const date = new Date(this.lastUpdate);
          const today = new Date();
          const isToday =
            date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear();
          const formattedDate = `${date.toLocaleDateString('en-US', {
            month: '2-digit',
            day: '2-digit',
            year: '2-digit',
          })} at ${date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
          })}`;
          if (isToday) {
            this.lastUpdate = 'Today' + ' at ' + formattedDate.slice(-8);
          } else {
            this.lastUpdate = formattedDate;
          }

          this.jsonData = newArray;
          let fromDate = new Date(this.jsonData[0].Date);

          let toDate = new Date(this.jsonData[this.jsonData.length - 1].Date);

          this.Avprice = this.jsonData[this.jsonData.length - 1].heatfleet;
          this.jsonData.lastUpdate = this.lastUpdate;

          this.fromDate =
            this.monthNames[fromDate.getMonth()] + ' ' + fromDate.getUTCDate();
          this.toDate =
            this.monthNames[toDate.getMonth()] + ' ' + toDate.getUTCDate();

          this.townAverage.emit(this.jsonData);

          if (this.loadChart) {
            setTimeout(() => {
              if (this.jsonData) {
                console.log('this.jsonData', this.jsonData);

                if (HistoricalPriceChart) {
                  const chart = new HistoricalPriceChart({
                    el: this.document.getElementById(
                      'histroical-price-chart-0'
                    ),
                  });
                  chart.updateData(this.jsonData);
                }
              }
            }, 1000);
          } else {
            // if (this.config.countTimes == 1) {
            setTimeout(() => {
              if (this.jsonData) {
                if (HistoricalPriceChart) {
                  const chart = new HistoricalPriceChart({
                    el: this.document.getElementById(
                      'histroical-price-chart-2'
                    ),
                  });
                  chart.updateData(this.jsonData);
                }
              }
            }, 1000);
            // }
          }
        } else {
          this.townAverage.emit(null);
        }
      },
      (error) => {
        console.log('Error----');

        // return this.HandleApiErrorDialogOnly(error);
      }
    );

    // }, 3000);
  }

  async getChartData3() {
    var input = this.router.url;
    var fields = input.split('/')[2].split('-');

    // var field2 = fields[2];
    var field4 = input.split('/')[2].split('-')[0];

    if (this.loadChart) {
      if (this.townData == undefined) {
        var url = this.getUrl('company/account/pricehistory?lat=0&lng=0');
      }
    } else if (this.loadCompanyChart) {
      var url = this.getUrl(
        'customer/offer/get-price-companywise?companyId=' + this.companyId
      );
    } else {
      if (this.townData != undefined) {
        var url = this.getUrl(
          'customer/offer/get-price-townwise?hash=' + field4
        );
      } else {
        var url = this.getUrl('company/account/pricehistory?lat=0&lng=0');
      }
    }

    this.http.get(url, this.getHttpOptions()).subscribe((data) => {
      if (this.townData != undefined) {
        if (this.loadChart) {
          var dta: any = data;

          if (dta.length) {
            this.showChart = true;
          }
        } else {
          var dta = data['priceData'];

          if (data['priceData'].length) {
            this.showChart = true;
          }
        }
      } else {
        var dta: any = data;
      }
      // var dta = this.m

      this.config.pricesData = dta;

      if (dta.length && dta) {
        let last: any = dta[dta.length - 1];

        if (this.loadChart) {
          this.lastUpdate = last.createdat;
        } else {
          if (this.townData != undefined) {
            this.lastUpdate = last.date;
          }
        }
      }

      if (this.showChart) {
        // }

        var newArray = JSON.parse(JSON.stringify(dta)).map((o) => {
          var today = new Date(o.date);

          var year = today.getFullYear();
          var month = today.getMonth() + 1;
          var day = today.getDate();
          let len = JSON.stringify(month).length;

          var newMonth: any;

          if (len == 1) {
            newMonth = JSON.stringify(0) + month;
          } else {
            newMonth = month;
          }

          let default_date =
            newMonth + '/' + JSON.stringify(day) + '/' + JSON.stringify(year);

          return {
            heatfleet: o.price,
            Date: default_date,
          };
        });

        const date = new Date(this.lastUpdate);
        const today = new Date();
        const isToday =
          date.getDate() === today.getDate() &&
          date.getMonth() === today.getMonth() &&
          date.getFullYear() === today.getFullYear();
        const formattedDate = `${date.toLocaleDateString('en-US', {
          month: '2-digit',
          day: '2-digit',
          year: '2-digit',
        })} at ${date.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
        })}`;
        if (isToday) {
          this.lastUpdate = 'Today' + ' at ' + formattedDate.slice(-8);
        } else {
          this.lastUpdate = formattedDate;
        }

        this.jsonData = newArray;
        let fromDate = new Date(this.jsonData[0].Date);

        let toDate = new Date(this.jsonData[this.jsonData.length - 1].Date);

        this.Avprice = this.jsonData[this.jsonData.length - 1].heatfleet;

        this.config.insertSchema(this.config.schema, 'structured-data-org');

        this.jsonData.lastUpdate = this.lastUpdate;
        this.townAverage.emit(this.jsonData);
        this.fromDate =
          this.monthNames[fromDate.getMonth()] + ' ' + fromDate.getUTCDate();
        this.toDate =
          this.monthNames[toDate.getMonth()] + ' ' + toDate.getUTCDate();

        setTimeout(() => {
          if (this.jsonData) {
            if (HistoricalPriceChart) {
              const chart = new HistoricalPriceChart({
                el: this.document.getElementById('histroical-price-chart-3'),
              });

              chart.updateData(this.jsonData);
            }
          }
        }, 1000);
      }
    });

    // }, 3000);
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
  selectedZip(n) {
    console.log('SELE', n);
  }
}
