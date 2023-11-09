import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/authentication/authentication.service';

// import {
//   AuthenticationService,
//   BaseComponent,
//   ConstructorParams,
//   EventBus,
// } from 'src/app/shared';
import { CommonService } from 'src/app/shared/services/common.config';
// import { FrequentlyUsedService } from 'src/shared/api/frequently-used.service';

@Component({
  selector: 'app-forgot-pw',
  templateUrl: 'forgot-pw.page.html',
  styleUrls: ['forgot-pw.page.sass'],
})
export class ForgotPwPage implements OnInit {
  readonly FIELD_EMAIL = 'Email';
  public isInformation = false;
  public form: FormGroup;

  constructor(
    private authenticationApiService: AuthenticationService,
    
    // public modalController: ModalController,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    // private navCtrl: NavController,
    private authService: AuthenticationService,
    // eventBus: EventBus,
    public config: CommonService
  ) {
    // super(ConstructorParams.Create().with(eventBus), fb);
  }

  ngOnInit(): void {

    
    this.form = this.fb.group({
      email: [this.config.email_entered, [Validators.required]],

    });


  }

  public initializeFormFields() {

  }
  public ionWillEnter() {
    this.isInformation = false;
  }

  public onHome(): void {

    console.log("Nv");
    
    this.config.navigate('');
  }

  public onNext(): void {
    // if (!this.form.valid) {
    //   return;
    // }
    //debugger;
    this.authenticationApiService
      .sendForgetPassword( this.form.value.email)
      .subscribe(
        (response) => {
          console.log(`forget password email sent: ${response.email}`);
          this.isInformation = true;
        },
        (error: HttpErrorResponse) => {
          // return this.HandleApiError(error);
        }
      );
  }
}
