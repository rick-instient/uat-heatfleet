import { Component, Inject, OnInit, Renderer2, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/shared/services/common.config';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {
  searchText: any;
  public contactForm: FormGroup;
  submitted = false;
  messageSent = false;
  validName = false;
  epochNow: any;
  phoneError = false;
  errorMessages: any = {
    name: [{ type: 'required', message: 'Name is required' }],
    email: [{ type: 'pattern', message: 'Invalid email' }],
    question: [{ type: 'required', message: 'Question is required' }],
  };

  // Define a custom validator function for phone numbers.
  phoneNumberValidator(control: AbstractControl): ValidationErrors | null {
    const phoneNumber = control.value;
    // Check if the phone number is numeric and has a length between 8 and 10.
    if (!/^\d{8,10}$/.test(phoneNumber)) {
      return { invalidPhoneNumber: true };
    }
    return null;
  }

  constructor(
    private fb: FormBuilder,
    public http: HttpClient,
    private title: Title,
    private meta: Meta,
    private _renderer2: Renderer2,
    @Inject(DOCUMENT) private _document: Document,
    public router: Router,
    public config: CommonService
  ) {
    let title_ = 'Contacts | Heating Oil Prices | Heat Fleet';
    this.title.setTitle(title_);
    let description =
      'Contact Heat Fleet at support@heatfleet.com or (203) 291-0777. For oil delivery timing, contact the provider which you can find in the confirm e-mail.';
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
        content: '/assets/icons/9m-Heat-Fleet-Heating-Oil-Logo.svg',
      },
      {
        property: 'twitter:image',
        content: '/assets/icons/9m-Heat-Fleet-Heating-Oil-Logo.svg',
      },
    ]);

    this.epochNow = '16800000000';
  }

  ngOnInit() {
    // this.config.checkCookie();
    this.config.updateCanonicalUrl('https://heatfleet.com' + this.router.url);

    let script = this._renderer2.createElement('script');
    script.id = 'ze-snippet';
    // script.src =
    //   'https://static.zdassets.com/ekr/snippet.js?key=95ced1dc-8526-48ee-9406-2ea8f48046bf';

    script.src = 'https://media-cdn.heatfleet.com/Js/zendesk.js';
    this._renderer2.appendChild(this._document.body, script);

    const PURE_EMAIL_REGEXP =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    this.contactForm = this.fb.group({
      name: ['', [Validators.required]],
      phoneNumber: ['', [this.phoneNumberValidator]],
      iam: ['', []],
      contact: ['', []],
      question: ['', [Validators.required]],
      email: ['', [Validators.pattern(PURE_EMAIL_REGEXP)]],
    });

    let schema_ = [
      {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '4651 Salisbury Rd.',
          addressLocality: 'Jacksonville',
          addressRegion: 'Florida',
          postalCode: '32256',
          addressCountry: 'USA',
        },
        email: 'support@heatfleet.com',
        name: 'Google.org (GOOG)',
        telephone: '(203) 291 - 0777',
      },
    ];
    this.config.insertSchema(schema_, 'structured-data-org');
  }

  get phoneNumber() {
    return this.contactForm.get('phoneNumber');
  }

  get email() {
    return this.contactForm.get('email');
  }

  isPhoneOrTextMessage(): boolean {
    const contactValue = this.contactForm.get('contact').value;
    return contactValue === 'Phone' || contactValue === 'TextMessage';
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
        // Authorization: token,
      }),
    };
  }

  countZero(s) {
    let cnt = 0;

    for (let i = 0; i < s.length; i++) {
      if (s[i] === '0') {
        cnt++;
      }
    }

    return cnt;
  }

  async contactSubmit() {
    this.submitted = true;
    this.validName = false;
    this.phoneError = false;
    // if (this.contactForm.invalid) {
    //   return;
    // }
    // const PURE_EMAIL_REGEXP =
    //   /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    // if (this.contactForm.value.contact == 'Email') {
    //   this.contactForm = this.fb.group({
    //     name: [this.contactForm.value.name, [Validators.required]],
    //     phoneNumber: [
    //       this.contactForm.value.phoneNumber,
    //       [Validators.maxLength(10), Validators.pattern('^[0-9]*$')],
    //     ],
    //     iam: [this.contactForm.value.iam, []],
    //     contact: ['Email', []],
    //     question: [this.contactForm.value.question, []],
    //     email: [
    //       this.contactForm.value.email,
    //       [Validators.required, Validators.pattern(PURE_EMAIL_REGEXP)],
    //       [
    //         { type: 'required', message: 'Required' },
    //         { type: 'pattern', message: 'Invalid Email' },
    //       ],
    //     ],
    //   });
    // }
    if (
      this.contactForm.value.contact == 'Phone' ||
      this.contactForm.value.contact == 'TextMessage'
    ) {
      this.contactForm.controls['email'].setValue('');
      // this.contactForm = this.fb.group({
      //   name: [this.contactForm.value.name, [Validators.required]],
      //   phoneNumber: [
      //     this.contactForm.value.phoneNumber,
      //     [
      //       Validators.required,
      //       Validators.maxLength(10),
      //       Validators.pattern('^[0-9]*$'),
      //     ],
      //     [
      //       { type: 'required', message: 'Required' },
      //       { type: 'pattern', message: 'Invalid Phone' },
      //     ],
      //   ],
      //   iam: [this.contactForm.value.iam, []],
      //   contact: ['Phone', []],
      //   question: [this.contactForm.value.question, []],
      //   email: [
      //     this.contactForm.value.email,
      //     [Validators.pattern(PURE_EMAIL_REGEXP)],
      //   ],
      // });

      if (this.contactForm.value.phoneNumber) {
        var count = this.countZero(this.contactForm.value.phoneNumber);

        if (count >= 8) {
          this.phoneError = true;
          return;
        }
      } else {
        this.validName = true;
        return;
      }

      if (this.contactForm.value.phoneNumber.length < 10) {
        this.phoneError = true;

        // this.presentToast(
        //   'Please review the phone number fields for mistake.',
        //   'error'
        // );

        return;
      }
    } else {
      const PURE_EMAIL_REGEXP =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if (!PURE_EMAIL_REGEXP.test(this.contactForm.value.email)) {
        this.validName = true;
        return;
      }

      this.contactForm.controls['phoneNumber'].setValue('');
    }

    if (this.contactForm.value.contact == null) {
      // this.presentToast('Please review the form for mistake.', 'error');
      this.validName = true;
      return;
    }

    if (this.contactForm.value.name == null) {
      this.validName = true;
      return;
    }

    if (this.contactForm.value.name) {
      if (this.contactForm.value.name.length < 1) {
        // this.presentToast('Please review the form for mistake.', 'error');
        this.validName = true;
        return;
      }
    }

    if (!this.contactForm.valid) {
      // this.presentToast('Please review the form for mistake.', 'error');
      this.validName = true;
      return;
    }

    const url = this.getUrl('customer/offer/savecontactdata');

    let form = {
      name: this.contactForm.value.name,
      ownerType: this.contactForm.value.iam,
      contactVia: this.contactForm.value.contact,
      phoneNumber: this.contactForm.value.phoneNumber,
      question: this.contactForm.value.question,
      email: this.contactForm.value.email,
    };

    // return;

    await this.http.post(url, form, this.getHttpOptions()).subscribe((data) => {
      if (data == true) {
        this.validName = false;

        this.messageSent = true;
        setTimeout(() => {
          this.messageSent = false;
        }, 2000);

        this.contactForm.reset();
      } else {
        this.messageSent = false;
      }
    });
  }
  // commented_v
  // async presentToast(m, style) {
  //   const toast = await this.toastController.create({
  //     message: m,
  //     duration: 2000,
  //     cssClass: style,
  //   });
  //   toast.present();
  // }

  keyPressNumbers(event) {
    var charCode = event.which ? event.which : event.keyCode;
    // Only Numbers 0-9
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }
  public ValidateForm(field): boolean {
    Object.keys(this.contactForm.controls).forEach((field) => {
      const control = this.contactForm.get(field);
      control.markAsTouched({ onlySelf: true });
    });
    return this.contactForm.valid;
  }

  validate() {
    Object.keys(this.contactForm.controls).forEach((field) => {
      const control = this.contactForm.get(field);
      control.markAsTouched({ onlySelf: true });
    });
    return this.contactForm.valid;
  }

  // selectType(val) {
  //   this.contactForm.controls.iam.setValue(val);
  // }
  // selectContact(val) {
  //   this.contactForm.controls.contact.setValue(val);
  // }
}
