import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

// import { SelectAreaServedDialogComponent } from 'src/app/dialogs/select-area-served/select-area-served-dialog.component';
import { CommonService } from '../../services/common.config';
// import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';



@Component({
  selector: 'app-oil-companies',
  templateUrl: './oil-companies.component.html',
  styleUrls: ['./oil-companies.component.scss'],
})
export class OilCompaniesComponent {
  // modalRef: BsModalRef;
  // @ViewChild('template') elementView: ElementRef;
  @ViewChild('template') elementView;
  modalView = false;
  @Input() townCompanies_Arr: any;
  @Input() townCompanies: any;
  @Input() showMore: any;
  @Input() showLess: any;
  @Input() city: any;
  @Input() state: any;
  @Input() areaServed: any;
  @Output() selectedZip = new EventEmitter<any>();
  townCompanies_Arr_: any;
  // townCompanies:any;

  constructor(
    public config: CommonService,
    // public modalController: ModalController,
    private router: Router,
    // private modalService: BsModalService
  ) {}

  ngOnInit() {
    // let townCompanies_Arr = this.townCompanies;
    this.townCompanies_Arr_ = this.townCompanies_Arr.slice(0, 10);
    console.log('townCompanies_Arr_ 0', this.townCompanies_Arr_);
  }

  toggleClick() {
    if (this.showMore) {
      this.loadMore();
    } else {
      this.loadLess();
    }
  }

  loadMore() {
    // this.showMore = false;
    // this.showLess = true;

    this.presentModal(this.elementView);
    // this.townCompanies_Arr = this.townCompanies;
  }

  loadLess() {
    this.showMore = true;
    this.showLess = false;

    this.townCompanies_Arr = this.townCompanies_Arr.slice(0, 30);
  }

  navigateCompany(event, n, fig) {
    var companyName;
    if (n.companyDBA) {
      companyName = n.companyDBA;
    } else {
      companyName = n.companyName;
    }

    companyName = this.config.replaceAll(companyName, '-', '_');
    companyName = this.config.replaceAll(companyName, ' ', '_');
    companyName = this.config.replaceAll(companyName, '/', '_');
    companyName = this.config.replaceAll(companyName, '.', '');
    companyName = this.config.replaceAll(companyName, '&amp;', '');
    companyName = this.config.replaceAll(companyName, ',', '');
    companyName = this.config.replaceAll(companyName, '&', '');
    companyName = this.config.replaceAll(companyName, ';', '');
    companyName = this.config.replaceAll(companyName, "'", '');
    companyName = this.config.replaceAll(companyName, '’', '');
    companyName = this.config.replaceAll(companyName, '"', '');
    companyName = this.config.replaceAll(companyName, '%26', '');
    companyName = this.config.replaceAll(companyName, '%2c', '');
    companyName = this.config.replaceAll(companyName, '%2f', '');
    companyName = this.config.replaceAll(companyName, '%2b', '');
    companyName = this.config.replaceAll(companyName, '%e2', '');
    companyName = this.config.replaceAll(companyName, '%80', '');
    companyName = this.config.replaceAll(companyName, '%99', '');
    companyName = this.config.replaceAll(companyName, '%20', '');
    companyName = this.config.replaceAll(companyName, '+', '');
    companyName = this.config.replaceAll(companyName, '!', '');
    companyName = this.config.replaceAll(companyName, ' ', '_');
    companyName = this.config.replaceAll(companyName, '__', '_');
    companyName = this.config.replaceAll(companyName, '|', '');

    let townName = this.config.replaceAll(n.townName, ' ', '_');
    if (townName.length === 3) {
      townName = townName + '_';
    }

    if (n.isRegion) {
      n.regionName = n.regionName
        .replace(/\b\w/g, (match) => match.toUpperCase())
        .replace(/\s/g, '_');

      townName = townName + '_' + n.regionName;
      var url =
        'heating_oil/' +
        n.townHash +
        '-' +
        n.companyHash +
        '-' +
        companyName +
        '-' +
        townName +
        '-' +
        n.stateHash.toUpperCase() +
        '.html';
      url = url.replace(/__/g, '_');
    } else {
      var url =
        'heating_oil/' +
        n.townHash +
        '-' +
        n.companyHash +
        '-' +
        companyName +
        '-' +
        townName +
        '-' +
        n.stateHash.toUpperCase() +
        '.html';
    }

    if (fig == true) {
      event.preventDefault();
      this.router.navigate([url]);
      return true;
    } else {
      return url;
    }
  }

  closeModel(){
    // this.elementView.nativeElement.className = 'modal hide';
    this.modalView = false;
  }

  async presentModal(template) {


    this.townCompanies_Duplicate = this.areaServed;
    this.townCompanies =  this.areaServed;
    this.selected_Id = '';
      
      // this.modalRef = this.modalService.show(template);
      // this.elementView.nativeElement.className = 'modal fade show';

    this.modalView = true;
    this.config.zipSearchModal = true;
    // commented_v
    // this.config.delivery_address =
    //   this.config.storageGet('delivery_address')['__zone_symbol__value'];
    // const modal = await this.modalController.create({
    //   component: SelectAreaServedDialogComponent,
    //   componentProps: {
    //     townCompanies: this.areaServed,
    //     townCompanies_Duplicate: this.areaServed,
    //     selected_Id: '',
    //   },
    //   cssClass: 'custom-dialog select-address',
    // });
    // modal.onDidDismiss().then((detail: OverlayEventDetail) => {
    //   if (detail.data) {
    //     if (detail.data.selectedZip_) {
    //       this.selectedZip.emit(detail.data.selectedZip_);
    //       // this.config.EnableLoggedInUser = 'EnableLoggedInUser';
    //       // var selectedDeliveryAddress = detail.data.selectedAddress_;
    //       // this.config.selectedDeliveryAddress = selectedDeliveryAddress;
    //       // var deliveryStreet1 = '';
    //       // if (selectedDeliveryAddress.deliveryStreet1) {
    //       //   deliveryStreet1 = selectedDeliveryAddress.deliveryStreet1 + ' ';
    //       // }
    //     }
    //   } else {
    //     return;
    //   }
    // });
    // modal.present();
  }
  checkedResdiential = true;
  address: any = [];
  selected_form_Id: any;
  selected_form_Id_form: any;
  disabledInp = false;
  // disabledSelection = false;
  selected_Id: any;
  private termsChecked = true;
  CheckedVal: any;
  AddNewAddress_ = false;
  SelectedEditId: any;
  EditedAddress: any;
  zipCodeInput: any;
  quantityInput_withGal = 100;
  loadingZipResponse = true;
  townCompanies_Duplicate: any;
  typedPostcode: any;

  async presentPopupDifferentZip(n) {
    this.selected_form_Id = n.postalCode;
    this.selected_Id = '';
    this.SelectedEditId = '';
    // this.selected_form_Id = n.postalCode;
    // this.EditedAddress = n;
    this.typedPostcode = null;
    this.zipCodeInput = n.postalCode;
    this.loadingZipResponse = false;
  }

  clearInput() {
    this.zipCodeInput = '';
  }

  SearchDeal() {
    if (this.zipCodeInput) {
      this.EditedAddress = this.zipCodeInput;
    }
      // commented_v
    // this.modalController.dismiss({ selectedZip_: this.EditedAddress });
  }

  findDeal() {
    this.SearchDeal();
  }

  find(m) {
    if (m.length == 0) {
      this.loadingZipResponse = true;
      this.townCompanies = this.townCompanies_Duplicate;
      return;
    }
    if (m.length == 5) {
      this.townCompanies_Duplicate.forEach((element) => {
        if (element.postalCode == m) {
          this.loadingZipResponse = false;
          this.zipCodeInput = m;
          this.typedPostcode = m;
        }
      });

      this.townCompanies = this.townCompanies_Duplicate;
      return;
    }
    // when nothing has typed
    this.townCompanies = this.townCompanies.filter(
      (item) => item.postalCode.toLowerCase().indexOf(m.toLowerCase()) > -1
    );

    // let filtr = this.townCompanies.filter((h) => h.id == this.CheckedVal);
  }



}
