import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonService } from '../../services/common.config';
import { ClientApiService } from '../../api/client.service';
import { NetworkService } from '../../api/network.service';
import { environment } from 'src/environments/environment';
import { ServiceType } from '../../models/types';
import { ToastService } from '../../services/toast.service';

export interface CustomWindow extends Window {
  customProperty: boolean;
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})

export class ModalComponent implements OnInit{
  @Input() modalTitle: string;
  @Input() modalMessage: string;
  @Output() closeModalEvent = new EventEmitter();
  @Input() suspiciousModal: any;
  @Input() NotifyZipDialog: any;
  
  @Input() zipCode: any;
  @Input()isValidUSZip: any;
  @Input()maxQuantity: any;
  @Input() city: any;
  @Input() zipCode1: any;
  @Input() ip: any;
  @Input() areaServed: any;
  selectedZip: any;
  cart: any;
  minimumQuantity: any;
  customerType = 0;
  quantityInput = 100;
  isLoading : boolean = false;
  ViewToast = false;
  private window: CustomWindow;
  
  constructor(public config: CommonService, private clientApiService: ClientApiService, public networkService: NetworkService,     private toastService: ToastService){}

  ngOnInit() {
    this.selectedZip = this.areaServed[0].postalCode;
    if(this.config.zipSearchModal){
      console.log("modal",this.areaServed);
    }
  }

  closeModal() {
    this.config.zipSearchModal = false;
    this.closeModalEvent.emit();
  }

  checkZipLength(){
    this.selectedZip = this.selectedZip;
  }

  searchDeal(){
    this.isLoading = true;
 
          
    let res = this.clientApiService.checkZipCode(this.selectedZip, this.networkService.ip_address);
    res.result.subscribe(
      (response) => {

       
        setTimeout(() => {
          this.isLoading = false;
        }, 3000);

        if (response.zipCodeExists) {
          this.minimumQuantity = response.minimumQuantity;
          this.cart = {};
          this.cart.zipCode = response.zipCode;
          this.cart.city = response.city;
          this.cart.county = response.county;
          this.cart.state = response.state;
          this.cart.isMultipleFips = response.isMultipleFips;
          this.cart.tankSize = 275;
          this.cart.isDealAvailable = response.isDealAvailable;
          this.cart.address = response.city;

          this.config.storageSave('cart', this.cart);

          this.config.storageSave('zipcode', response.zipCode);
          this.config.storageSave('defaultcity', response.city);
          this.config.storageSave('defaultstate', response.state);

          this.config.storageSave(
            'isDealAvailable',
            JSON.stringify(response.isDealAvailable)
          );

          this.config.storageSave('zipCodeExists', 'true');

          var orderType = ServiceType.OilDelivery;

          let path_ = environment.secure_url;
          
          let url = path_+"oil-select-provider/"+this.selectedZip+"/"+0+"/"+this.customerType+"/"+orderType+"/"+this.quantityInput
          window.open(url, "_self");
        }
        
        else{
          this.isLoading = false;
          this.ViewToast = true;


          this.toastService.showToast("Please Enter a Valid Zip Code");
      

          // this.window.alert("Please Enter a Valid Zip Code");
        }
      })
  }
}