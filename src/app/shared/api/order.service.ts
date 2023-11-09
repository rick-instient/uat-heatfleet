import { HttpHeaders, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CookieHelper } from "../cookie-helper";
import { ActiveOrdersResponse, CalculationResponse, CalendarOilDay, CalendarOilOrder, CalendarServiceOrder, ClientUser, ClientUserShort, CompanyOilGiveupOrder, CompanyOilOrder, CompanyServiceOrder, CustomerTaxType, DayDataResponse, DeliveryCalendarResponse, NewOilParameters, NewServiceParameters, OpenedZipCode, OrderStatus, OverdueOrdersResponse, TrucksResponse } from "../models/general.model";
import { NetworkService } from "./network.service";
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class OrderApiService {
  constructor(
    private http: NetworkService,
    private cookieHelper: CookieHelper,
    ) {}
    
      public getScheduledOilDeliveries(companyId: string):Observable<CalendarOilOrder[]> {
        const url = `company/order/schedule/oildelivery/waiting?CompanyId=${companyId}`;
        const headers = new HttpHeaders().set(
          'Content-Type', 'application/json',
        );
    
        return this.http.get(url, { headers });
      }
    
      public getScheduledServiceDeliveries(companyId: string):Observable<CalendarServiceOrder[]> {
        const url = `company/order/schedule/service/waiting?CompanyId=${companyId}`;
        const headers = new HttpHeaders().set(
          'Content-Type', 'application/json',
        );
    
        return this.http.get(url, { headers });
      }

      public scheduleService(orderId: number, dayId: string, truckId: number): Observable<HttpResponse<any>>{
        const url = `company/order/schedule/service?CompanyId=${this.cookieHelper.getCompanyId()}&api-version=${environment.api_version}&orderId=${orderId}&dayId=${dayId}&truckId=${truckId}`;
        const headers = new HttpHeaders().set(
          'Content-Type', 'application/json',
        );
    
        return this.http.put(url, null, { headers, observe: 'response' });
      }

      public scheduleOilDelivery(orderId: number, dayId: string, truckId: number): Observable<HttpResponse<any>>{
        const url = `company/order/schedule/oildelivery?CompanyId=${this.cookieHelper.getCompanyId()}&api-version=${environment.api_version}&orderId=${orderId}&dayId=${dayId}&truckId=${truckId}`;
        const headers = new HttpHeaders().set(
          'Content-Type', 'application/json',
        );
    
        return this.http.put(url, {}, { headers, observe: 'response' });
      }
      public confirmOilGiveupDelivery(orderId: number, dayId: string, truckId: number): Observable<HttpResponse<any>>{
        const url = `company/order/confirm/giveupoildelivery?CompanyId=${this.cookieHelper.getCompanyId()}&api-version=${environment.api_version}&orderId=${orderId}&dayId=${dayId}&truckId=${truckId}`;
        const headers = new HttpHeaders().set(
          'Content-Type', 'application/json',
        );
    
        return this.http.put(url, {}, { headers, observe: 'response' });
      }
      
      public getTrucks():Observable<TrucksResponse> {
        const url = `company/account/trucks/all?api-version=${environment.api_version}`;
        const headers = new HttpHeaders().set(
          'Content-Type', 'application/json',
        );
    
        return this.http.get(url, { headers });
      }

      public getCompanyOilOrderDetails(orderId: number):Observable<CompanyOilOrder> {
        const url = `company/order/get/oil?api-version=${environment.api_version}&orderId=${orderId}`;
        const headers = new HttpHeaders().set(
          'Content-Type', 'application/json',
        );
    
        return this.http.get(url, { headers });
      }
      public getCompanyOilGiveupOrderDetails(orderId: number):Observable<CompanyOilGiveupOrder> {
        const url = `company/order/get/giveupoil?api-version=${environment.api_version}&orderId=${orderId}`;
        const headers = new HttpHeaders().set(
          'Content-Type', 'application/json',
        );
    
        return this.http.get(url, { headers });
      }

      public getCompanyServiceOrderDetails(orderId: number):Observable<CompanyServiceOrder> {
        const url = `company/order/get/service?api-version=${environment.api_version}&orderId=${orderId}`;
        const headers = new HttpHeaders().set(
          'Content-Type', 'application/json',
        );
    
        return this.http.get(url, { headers });
      }

      public changeOrderState(orderId: number, newStatus: OrderStatus): Observable<HttpResponse<any>>{
        const url = `company/order/state?api-version=${environment.api_version}&orderId=${orderId}&newStatus=${newStatus}`;
        const headers = new HttpHeaders().set(
          'Content-Type', 'application/json',
        );

        return this.http.put(url, {}, { headers, observe: 'response' });
      }

      public failOrder(orderId): Observable<HttpResponse<any>>{
        const url = `company/order/state?api-version=${environment.api_version}&orderId=${orderId}&newStatus=${OrderStatus.DeliveryFailed}`;
        const headers = this.getHeader();

        return this.http.put(url, {}, { headers, observe: 'response' });
      }
      
      public cancelOrder(orderId): Observable<HttpResponse<any>>{
        const url = `company/order/state?api-version=${environment.api_version}&orderId=${orderId}&newStatus=${OrderStatus.Canceled}`;
        const headers = this.getHeader();

        return this.http.put(url, {}, { headers, observe: 'response' });
      }

      public updateOrderHouseDetails(orderId: number, houseDescription: string, fillLocationDescription: string, 
        tankPosition: number, tankLocation: number, propertyArea: number, termostatTemperature: number): Observable<HttpResponse<any>>{
        const url = `company/order/update/oil?api-version=${environment.api_version}`;
        const headers = this.getHeader();

        const body = {
          'orderId': orderId,
          'houseDescription': houseDescription,
          'fillLocationDescription': fillLocationDescription,
          //'tankSize': "",
          'tankPosition': tankPosition,
          'tankLocation': tankLocation,
          'propertyArea': propertyArea,
          'termostatTemperature': termostatTemperature
        };

        return this.http.put(url, body, { headers, observe: 'response' });
      }

      public getDayDetails(dayId: string,truckId:number):Observable<DayDataResponse> {
        const url = `company/order/day?api-version=${environment.api_version}&dayId=${dayId}&truckId=${truckId}`;
        const headers = this.getHeader();
    
        return this.http.get(url, { headers });
      }

      public getDayDetailsForUser(dayId: string):Observable<DayDataResponse> {
        const url = `company/order/truckday?api-version=${environment.api_version}&dayId=${dayId}`;
        const headers = new HttpHeaders().set(
          'Content-Type', 'application/json',
        );
    
        return this.http.get(url, { headers });
      }

      public completeOilOrder(orderId:number,amount:number):Observable<HttpResponse<any>>{
        const url = `company/order/complete/oil?api-version=${environment.api_version}`;
        const headers = this.getHeader();
        const body = {
          'orderId': orderId,
          'amount':amount
        };

        return this.http.put(url, body, { headers, observe: 'response' });
      }

      public giveUpOilOrder(orderId: number):Observable<HttpResponse<any>>{
        const url = `company/order/giveup/oil?api-version=${environment.api_version}&orderId=${orderId}`;
        const headers = this.getHeader();
        const body = {
        };

        return this.http.put(url, body, { headers, observe: 'response' });
      }

      public giveUpOilOrderBack(orderId: number):Observable<HttpResponse<any>>{
        const url = `company/order/giveup/oil/back?api-version=${environment.api_version}&orderId=${orderId}`;
        const headers = this.getHeader();
        const body = {
        };

        return this.http.put(url, body, { headers, observe: 'response' });
      }

      public completeTuneUpOrder(orderId: number, additionalServicePrice: number,additionalServiceSalesTax): Observable<HttpResponse<any>>{
        const url = `company/order/complete/tuneup?api-version=${environment.api_version}`;
        const headers = this.getHeader();
        const body = {
          'orderId': orderId,
          'additionalServicePrice':additionalServicePrice,
          'additionalServiceSalesTax':additionalServiceSalesTax
        };

        return this.http.put(url, body, { headers, observe: 'response' });
      }

      public completeServiceCallOrder(orderId: number, additionalServicePrice: number,additionalServiceSalesTax): Observable<HttpResponse<any>>{
        const url = `company/order/complete/servicecall?api-version=${environment.api_version}`;
        const headers = this.getHeader();
        const body = {
          'orderId': orderId,
          'additionalServicePrice':additionalServicePrice,
          'additionalServiceSalesTax':additionalServiceSalesTax
        };

        return this.http.put(url, body, { headers, observe: 'response' });
      }

      public completeOneYearContractOrder(orderId: number): Observable<HttpResponse<any>>{
        const url = `company/order/complete/oneyearcontract?api-version=${environment.api_version}`;
        const headers = this.getHeader();
        const body = {
          'orderId': orderId
        };

        return this.http.put(url, body, { headers, observe: 'response' });
      }

      public searchUsers(email: string,dayId:string,type:number):Observable<ClientUserShort[]> {
        const url = `company/neworder/searchuser?api-version=${environment.api_version}&email=${email.replace("+",";")}&dayId=${dayId}&type=${type}`;
        const headers = this.getHeader();
    
        return this.http.get(url, { headers });
      }
    
      public getUser(userId: number):Observable<ClientUser> {
        const url = `company/neworder/user?api-version=${environment.api_version}&userId=${userId}`;
        const headers = this.getHeader();
    
        return this.http.get(url, { headers });
      }

      public saveNewServiceOrder(newUser:boolean,email: string, firstName:string, lastName:string,
        companyId:string,serviceId: number,isUpsale: boolean,userId: number, customerType: number, 
        deliveryDay: string,
        phoneNumber:string,backupPhoneNumber:string,deliveryStreet1: string, deliveryStreet2: string, deliveryCity: string, deliveryState: string, deliveryZIP: string,
        deliveryFIPS: string, deliveryCounty: string,
        billingAddressSameAsDeliveryAddress: boolean, billingStreet1: string, billingStreet2: string, billingCity: string, billingState: string, billingZIP: string,
        truckId:number): Observable<HttpResponse<any>>{

        const url = `company/neworder/service?api-version=${environment.api_version}`;
        const headers = this.getHeader();

        const body = {
          newUser: newUser,
          email: email,
          firstName:firstName,
          lastName:lastName,
          customerType: customerType,
          companyId:companyId,
          userId: userId,
          serviceId: serviceId,
          deliveryDay: deliveryDay,
          isUpsale: isUpsale,
          phoneNumber:phoneNumber,
          backupPhoneNumber:backupPhoneNumber,
          deliveryStreet1: deliveryStreet1,
          deliveryStreet2: deliveryStreet2,
          deliveryCity: deliveryCity,
          deliveryState: deliveryState,
          deliveryZIP: deliveryZIP,
          deliveryFIPS: deliveryFIPS,
          deliveryCounty: deliveryCounty,
          billingAddressSameAsDeliveryAddress: billingAddressSameAsDeliveryAddress,
          billingStreet1: billingStreet1,
          billingStreet2: billingStreet2,
          billingCity: billingCity,
          billingState: billingState,
          billingZIP: billingZIP,
          truckId:truckId
        };
        return this.http.post(url, body, { headers, observe: 'response' });
      }

      public saveNewOilOrder(newUser:boolean,email:string,firstName:string, lastName:string,
        companyId:string,isFuelAdditive: boolean,userId: number, customerType: number, 
        deliveryDay: string, amount: number,        
        phoneNumber:string,backupPhoneNumber:string,deliveryStreet1: string, deliveryStreet2: string, deliveryCity: string, deliveryState: string, deliveryZIP: string,
        deliveryFIPS: string, deliveryCounty: string,
        billingAddressSameAsDeliveryAddress: boolean, billingStreet1: string, billingStreet2: string, billingCity: string, 
        billingState: string, billingZIP: string, houseDescription: string, fillLocationDescription: string, 
        tankSize: number, tankPosition: number, tankLocation: number,propertyArea:number,termostatTemperature:number,truckId:number): Observable<HttpResponse<any>>{

        const url = `company/neworder/oildelivery?api-version=${environment.api_version}`;
        const headers = this.getHeader();

        const body = {
          email:email,
          firstName:firstName,
          lastName:lastName,
          newUser:newUser,
          companyId:companyId,
          isFuelAdditive: isFuelAdditive,
          userId: userId,
          customerType: customerType,
          phoneNumber:phoneNumber,
          backupPhoneNumber:backupPhoneNumber,
          deliveryDay: deliveryDay,
          amount: amount,
          deliveryStreet1: deliveryStreet1,
          deliveryStreet2: deliveryStreet2,
          deliveryCity: deliveryCity,
          deliveryState: deliveryState,
          deliveryZIP: deliveryZIP,
          deliveryFIPS: deliveryFIPS,
          deliveryCounty: deliveryCounty,
          billingAddressSameAsDeliveryAddress: billingAddressSameAsDeliveryAddress,
          billingStreet1: billingStreet1,
          billingStreet2: billingStreet2,
          billingCity: billingCity,
          billingState: billingState,
          billingZIP: billingZIP,
          houseDescription: houseDescription,
          fillLocationDescription: fillLocationDescription,
          tankSize: tankSize,
          tankPosition: tankPosition,
          propertyArea:propertyArea,
          termostatTemperature:termostatTemperature,
          tankLocation: tankLocation,
          truckId:truckId
        };

        return this.http.post(url, body, { headers, observe: 'response' });
      }

      public getNewServiceParameters(dayId: string):Observable<NewServiceParameters> {
        const url = `company/neworder/service?api-version=${environment.api_version}&dayId=${dayId}`;
        const headers = this.getHeader();
    
        return this.http.get(url, { headers });
      }

      public getNewOilDeliveryParameters(dayId: string):Observable<NewOilParameters> {
        const url = `company/neworder/oildelivery?api-version=${environment.api_version}&dayId=${dayId}`;
        const headers = this.getHeader();
    
        return this.http.get(url, { headers });
      }

      public recalculateOilOrder(orderId: number,amount:number):Observable<CalculationResponse> {
        const url = `company/order/recalculate/oil?api-version=${environment.api_version}`;
        const headers = this.getHeader();
        const body = {
          orderId:orderId,
          amount:amount
        }
        return this.http.post(url, body,{ headers });
      }

      public calculateOilOrder(userId,amount: number, isFuelAdditive: string,zip:string,customerTaxType:string, deliveryState: string, deliveryFIPS: string):Observable<CalculationResponse> {
        const url = `company/neworder/calculate/oil?api-version=${environment.api_version}`;
        const headers = this.getHeader();
        const body = {
          isFuelAdditive:isFuelAdditive,
          amount:amount,
          userId:userId,
          zip:zip,
          customerTaxType:customerTaxType,
          deliveryState: deliveryState,
          deliveryFIPS: deliveryFIPS,
        }
        return this.http.post(url, body,{ headers });
      }

      public calculateServiceOrder(userId,serviceId: number, isUpsale: string,zip:string,customerTaxType:string, deliveryState: string, deliveryFIPS: string):Observable<CalculationResponse> {
        const url = `company/neworder/calculate/service?api-version=${environment.api_version}`;
        const headers = this.getHeader();
        const body = {
          isUpsale:isUpsale,
          serviceId:serviceId,
          userId:userId,
          zip:zip,
          customerTaxType:customerTaxType,
          deliveryState: deliveryState,
          deliveryFIPS: deliveryFIPS,
        }
        return this.http.post(url, body,{ headers });
      }


      public getActiveOrders(truckId:number):Observable<ActiveOrdersResponse> {
        const url = `company/order/active?api-version=${environment.api_version}&truckId=${truckId}`;
        const headers = this.getHeader();
    
        return this.http.get(url, { headers });
      }

      public getOverdueOrders():Observable<OverdueOrdersResponse> {
        const url = `company/order/overdue?api-version=${environment.api_version}`;
        const headers = this.getHeader();
    
        return this.http.get(url, { headers });
      }

      private getHeader():HttpHeaders{
        return new HttpHeaders({
            'Content-Type': 'application/json',
            'DAVOS-IsMobile': environment.isMobile.toString()
        });
      }

      public getHotList():Observable<OverdueOrdersResponse> {
        const url = `company/order/hotlist?api-version=${environment.api_version}`;
        const headers = this.getHeader();
    
        return this.http.get(url, { headers });
      }
    
}
