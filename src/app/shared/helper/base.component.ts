import { ConstructorParams } from './constructor.params';
import { EventBus } from './eventbus';

import { HttpErrorResponse } from '@angular/common/http';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { environment } from 'src/environments/environment';
// commented_v
// import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import { URLS } from 'src/app/shared/urls';

// @Injectable()
export class BaseComponent {
  public URLS = URLS;
  public form: FormGroup = null;
  public formAddress: FormGroup = null;
  public isFormValidated = false;
  public isFormValidated_address = false;

  // public formBuilder: FormBuilder;
  public formValidationErrorMessages: ValidationErrorMessages = {};
  protected eventBus: EventBus;
  // protected modalController: ModalController;
  // protected navController: NavController;
  // protected toastController: ToastController;

  constructor(
    protected constructorParams: ConstructorParams,
    public formBuilder: FormBuilder
  ) {
    this.constructorParams.setParameters(this);
  }

  public Image(imageName: string): string {
    return `${environment.image_url}${imageName}`;
  }

  protected initializeFormFields(): void {
    console.log(
      `No form fields inited in this component: ${this.ComponentName}`
    );
  }

  protected initializeFormFields_Address(): void {
    // console.log(
    //   `No form fields inited in this component: ${this.ComponentName}`
    // );
  }

  protected initializeForm(): void {
    if (this.formBuilder != null) {
      this.form = this.formBuilder.group({});
      this.initializeFormFields();
    } else {
      console.log(
        `No formBuilder inited in this component: ${this.ComponentName} add formBuilder to ConstructprParams object of parent compoent`
      );
    }
  }

  protected initializeAddressForm(): void {
    if (this.formBuilder != null) {
      this.formAddress = this.formBuilder.group({});
      this.initializeFormFields_Address();
    } else {
      console.log(
        `No formBuilder inited in this component: ${this.ComponentName} add formBuilder to ConstructprParams object of parent compoent`
      );
    }
  }

  public AddFormField_AddressForm(
    fieldName: string,
    validators: any,
    errorMessages: ValidationErrorMessage[],
    disabled: boolean = false
  ): void {
    if (this.formAddress == null) {
      // console.log(`No form inited in this component: ${this.ComponentName}`);
      return;
    }
    this.formAddress.addControl(
      fieldName,
      new FormControl(
        { value: '', disabled: disabled },
        { validators: validators }
      )
    );
    this.formValidationErrorMessages[fieldName] = errorMessages;
  }

  public FieldIsInvalid_Address(fieldName: string): boolean {
    return this.FieldIsInvalidInForm_Address(fieldName, this.formAddress);
  }

  public FieldIsInvalidInForm_Address(
    fieldName: string,
    formAddress: FormGroup
  ): boolean {
    const field = formAddress.get(fieldName);
    if (field == null) {
      return false;
    }
    return field.invalid && (field.dirty || field.touched);
  }

  public CheckObjectInited(name: string): boolean {
    const res = this[name] != null;
    if (res == false) {
      console.error(`Object is not inited ${name} in ${this.ComponentName}`);
    }
    return res;
  }

  public get ComponentName(): string {
    return this.constructor.name;
  }

  public AddFormField(
    fieldName: string,
    validators: any,
    errorMessages: ValidationErrorMessage[],
    disabled: boolean = false
  ): void {
    if (this.form == null) {
      // console.log(`No form inited in this component: ${this.ComponentName}`);
      return;
    }
    this.form.addControl(
      fieldName,
      new FormControl(
        { value: '', disabled: disabled },
        { validators: validators }
      )
    );
    this.formValidationErrorMessages[fieldName] = errorMessages;
  }

  public SetFieldValues(data: any): void {
    for (let key in data) {
      this.SetFieldValue(key, data[key]);
    }
  }

  public SetFieldValues_Address(data: any): void {
    for (let key in data) {
      this.SetFieldValue_Address(key, data[key]);
    }
  }

  public SetFieldValue(fieldName: string, value: any) {
    const field = this.form.get(fieldName);
    if (field == null) {
      return;
    }
    // console.log(`Set Field: ${fieldName} with: ${value}`);

    field.setValue(value);
  }

  public FieldIsInvalid(fieldName: string): boolean {
    return this.FieldIsInvalidInForm(fieldName, this.form);
  }

  public FieldIsInvalidInForm(fieldName: string, form: FormGroup): boolean {
    const field = form.get(fieldName);
    if (field == null) {
      return false;
    }
    return field.invalid && (field.dirty || field.touched);
  }

  public GetFieldValue(fieldName: string) {
    const field = this.form.get(fieldName);
    return field.value;
  }

  public GetFieldValue_Address(fieldName: string) {
    const field = this.formAddress.get(fieldName);
    if (field.value != null) {
      return field.value;
    }
  }
  public SetFieldValue_Address(fieldName: string, value: any) {
    const field = this.formAddress?.get(fieldName);
    if (field == null) {
      return;
    }
    // console.log(`Set Field: ${fieldName} with: ${value}`);

    field.setValue(value);
  }

  public GetField(fieldName: string): AbstractControl {
    return this.form.get(fieldName);
  }

  public FieldFirstError(fieldName: string): string {
    return this.FieldFirstErrorInForm(
      fieldName,
      this.form,
      this.formValidationErrorMessages
    );
  }

  public FieldFirstError_Address(fieldName: string): string {
    return this.FieldFirstErrorInForm(
      fieldName,
      this.formAddress,
      this.formValidationErrorMessages
    );
  }

  public FieldFirstErrorInForm(
    fieldName: string,
    form: FormGroup,
    validationErrorMessages: ValidationErrorMessages
  ): string {
    const field = form.get(fieldName);
    if (field == null) {
      return '';
    }
    if (field.errors == null) {
      return '';
    }
    for (let validation of validationErrorMessages[fieldName]) {
      if (field.hasError(validation.type)) {
        return validation.message;
      }
    }
    const msg = Object.keys(field.errors)[0];
    return msg;
  }

  public IsFormValid(): boolean {
    this.isFormValidated = true;
    return this.form.valid;
  }

  public ValidateForm(): boolean {
    this.isFormValidated = true;
    Object.keys(this.form.controls).forEach((field) => {
      const control = this.form.get(field);
      control.markAsTouched({ onlySelf: true });
    });
    return this.form.valid;
  }

  public ValidateForm_Address(): boolean {
    this.isFormValidated_address = true;
    Object.keys(this.formAddress.controls).forEach((field) => {
      const control = this.formAddress.get(field);
      control.markAsTouched({ onlySelf: true });
    });
    return this.formAddress.valid;
  }

  public PrepareData(data: any): void {
    if (data == null) {
      data = {};
    }
    Object.keys(this.form.controls).forEach((field) => {
      const control = this.form.get(field);
      data[field] = control.value;
    });
  }

  public async ShowError(msg: string): Promise<void> {
    if (this.modalController == null) {
      console.error(
        `Modal Controller not set int this component:  ${this.ComponentName}`
      );
    }
    const modal = await this.modalController.create({
      component: ErrorDialogComponent,
      componentProps: {
        message: msg,
      },
      cssClass: 'custom-dialog error-dialog',
    });
    modal.onDidDismiss().then((detail: OverlayEventDetail) => {});
    modal.present();
  }

  public async ShowErrors(msg: string[]): Promise<void> {
    if (this.modalController == null) {
      console.error(
        `Modal Controller not set int this component:  ${this.ComponentName}`
      );
    }

    const modal = await this.modalController.create({
      component: ErrorDialogComponent,
      componentProps: {
        messages: msg,
      },
      cssClass: 'custom-dialog error-dialog',
    });
    modal.onDidDismiss().then((detail: OverlayEventDetail) => {});
    modal.present();
  }

  public async ShowSaveSuccessToast(): Promise<void> {
    this.PresentToast('Successfully saved!');
  }

  public async ShowRemovedSuccessToast(): Promise<void> {
    this.PresentToast('Successfully removed!');
  }

  public async ShowCreatedSuccessToast(): Promise<void> {
    this.PresentToast('Successfully created!');
  }

  public async ShowUploadSuccessToast(): Promise<void> {
    this.PresentToast('Successfully uploaded!');
  }

  public async ShowTopErrorToast(msg: string): Promise<void> {
    this.PresentErrorToast(msg, 'top');
  }

  public async ShowMiddleErrorToast(
    msg: string,
    duration = 5000
  ): Promise<void> {
    this.PresentErrorToast(msg, 'middle', duration);
  }

  public async ShowErrorToast(msg: string): Promise<void> {
    this.PresentErrorToast(msg);
  }

  public async PresentToast(msg: string): Promise<void> {
    if (this.toastController == null) {
      console.error(`No toast controller for: ${this.ComponentName}`);
      return;
    }

    if (msg == null || msg.length == 0) {
      msg = 'Something went wrong!';
    }

    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      cssClass: 'successtoast',
    });
    toast.present();
  }

  public async PresentErrorToast(
    msg: string,
    position: 'top' | 'bottom' | 'middle' = 'bottom',
    duration = 5000
  ): Promise<void> {
    if (this.toastController == null) {
      console.error(`No toast controller for: ${this.ComponentName}`);
      return;
    }
    const toast = await this.toastController.create({
      message: msg,
      color: 'danger',
      position: position,
      duration: duration,
      cssClass: 'error',
    });
    toast.present();
  }

  public NavigateTo(route: string): void {
    if (this.CheckObjectInited('navController') == false) {
      return;
    }
    this.navController.navigateRoot([route]);
  }

  public HandleApiError(error: HttpErrorResponse): void {
    this.HandleApiErrorBase(error, true);
  }

  public HandleApiErrorDialogOnly(error: HttpErrorResponse): void {
    this.HandleApiErrorBase(error, false);
  }

  public HandleApiErrorBase(
    error: HttpErrorResponse,
    fieldValidation: boolean
  ): void {
    if (error.status == 400) {
      // debugger;
      this.HandleBadRequest(error.error, fieldValidation);
      return;
    }
    // debugger
    if (error.error != null && error.error.title != null) {
      if (error.error.detail != null) {
        console.log(`error detail: ${error.error.detail}`);
      }
      this.ShowError(error.error.title);
      return;
    }
    if (error.message != null) {
      console.log(`error: ${error.message}`);
      this.ShowError(error.message);
      return;
    }
    console.error(error);
  }

  public HandleBadRequest(error: any, fieldValidation: boolean): void {
    if (error.errors?.length > 0) {
      const errors = error.errors;
      const notHandledErrors = [];
      if (fieldValidation) {
        errors.forEach((error) => {
          const fieldName = error.fieldName;
          if (fieldName) {
            console.log(`error: ${fieldName} -> ${error.errorMessage}`);
            if (this.form == null) {
              notHandledErrors.push(error);
              return;
            }
            let field = this.form.get(fieldName);
            if (field) {
              let e = {};
              e[error.errorMessage] = true;
              field.setErrors(e);
            } else {
              notHandledErrors.push(error);
            }
          }
        });
        if (notHandledErrors.length > 0) {
          this.ShowErrors(notHandledErrors.map((e) => e.errorMessage));
        }
      } else {
        if (errors != null && errors.length > 0) {
          let error = errors[0];
          if (
            error != null &&
            error.errorMessage != null &&
            error.errorMessage != ''
          ) {
            this.ShowError(errors[0].errorMessage);
          }
        }
      }
    } else {
      console.log(`error: ${error.detail}`);
      this.ShowError(error.detail);
    }
  }
}
export type ValidationErrorMessages = {
  [key: string]: ValidationErrorMessage[];
};
export interface ValidationErrorMessage {
  type: string;
  message: string;
}
