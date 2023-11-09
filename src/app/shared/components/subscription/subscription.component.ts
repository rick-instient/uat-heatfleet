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
// import { ClientApiService } from 'src/shared/api/client.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Storage } from "@ionic/storage-angular";
import { environment } from 'src/environments/environment';
// import { CookieHelper } from '../../../../shared/cookie-helper';

import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { DOCUMENT } from '@angular/common';
// import { CommonService } from 'src/app/heatfleet-landing/common.config';
import { ClientApiService } from '../../api/client.service';
import { CommonService } from '../../services/common.config';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss'],
})
export class SubscriptionComponent implements OnInit {
  firstTimeLoad: boolean = false;

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
  }

  ngOnChanges() {}

  async ngOnInit() {
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
    // const toast = await this.toastController.create({
    //   message: m,
    //   duration: 2000,
    //   cssClass: style,
    // });
    // toast.present();

    window.alert(m);
  }
}
