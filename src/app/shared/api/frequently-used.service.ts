import { HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NetworkService } from './network.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CookieHelper } from '../cookie-helper';
import { HomeDataResponse, ZipCodeCheckResponse } from '../models/client.model';
import { formatDate } from '@angular/common';
import { CustomerTaxType, OrderStatus, ServiceType } from '../models/types';
import {
  Cart,
  OilOrder,
  OrderDetailsResponse,
  PriceTier,
} from '../models/general.model';

export class FrequentlyUsedService {
  public static emailRegExObj = /\S+@\S+\.\S+/;
  public static passwordLength = 6;

  public static getPersonalDataMultilineText(
    firstname: string,
    lastname: string,
    email: string,
    phone: string
  ): string {
    return (
      firstname +
      ' ' +
      lastname +
      '\n' +
      //+ email + "\n"
      phone
    );
  }

  public static getAddressMultilineText(
    line1: string,
    line2: string,
    city: string,
    zip: string,
    state: string,
    county: string,
    fips: string
  ): string {
    var result = line1;
    if (line2 != null && line2 != '') {
      result += '\n' + line2;
    }
    result += '\n' + city;
    result += '\n' + zip + ' ' + state;
    result += '\n' + county;

    return result;
  }

  public static getCart(cart: Cart = null): Cart {
    if (cart != null) {
      return {
        isZipChanged: false,
        isMultipleFips: false,
        isDealAvailable: false,
        isFlatDeliveryFee: false,
        isFlashSale: false,
        flatDeliveryFee: 0,
        isFuelAdditive: false,
        serviceName: '',
        companyId: -1,
        companyName: '',
        price: 0,
        customerType: cart.customerType,
        deliveryDay: '',
        isTermsAccepted: false,
        isUpsale: false,
        orderType: ServiceType.Unknown,
        payWithCash: false,
        serviceId: -1,
        tankSize: cart.tankSize,
        userId: cart.userId,
        zipCode: cart.zipCode,
        city: cart.city,
        county: cart.county,
        fipsCode: cart.fipsCode,
        state: cart.state,
        amount: 0,
        address: cart.address,
        token: '',
        flatFee: cart.flatFee,
        isFlatFee: cart.isFlatFee,
      };
    } else {
      return {
        isZipChanged: false,
        isMultipleFips: false,
        isDealAvailable: false,
        isFlashSale: false,
        isFlatDeliveryFee: false,
        flatDeliveryFee: 0,
        isFuelAdditive: false,
        serviceName: '',
        companyId: -1,
        companyName: '',
        price: 0,
        customerType: CustomerTaxType.Unknown,
        deliveryDay: '',
        isTermsAccepted: false,
        isUpsale: false,
        orderType: ServiceType.Unknown,
        payWithCash: false,
        serviceId: -1,
        tankSize: 0,
        userId: 0,
        zipCode: '',
        city: '',
        county: '',
        fipsCode: '',
        state: '',
        address: '',
        amount: 0,
        token: '',
        flatFee: '',
        isFlatFee: '',
      };
    }
  }

  public static GetLabelByOrderType(type: number): string {
    switch (type) {
      case 0:
        return 'Fill Up';
      case 1:
        return 'Tune-Up';
      case 2:
        return 'Service Call';
      case 3:
        return '1-Year Service Contract';

      default:
        return '';
    }
  }

  public static GetLabelByOrderStatus(status: number): string {
    switch (status) {
      case OrderStatus.Canceled:
        return 'Canceled';
      case OrderStatus.Delivered:
        return 'Delivered';
      case OrderStatus.DeliveryFailed:
        return 'Failed';
      case OrderStatus.Giveup:
        return 'Giveup';
      case OrderStatus.Pending:
        return 'Pending';
      case OrderStatus.PaymentFailed:
        return 'Payment failed';
      case OrderStatus.Scheduled:
        return 'Scheduled';
      default:
        return '-';
    }
  }

  public static GetPriceTierFrom(item: PriceTier): number {
    return item.from - 1;
  }

  public static GetPaymentMethodLabel(payWithCash: boolean): string {
    if (payWithCash) {
      return 'Cash';
    } else {
      return 'Card';
    }
  }

  public static getCurrentDayString(): string {
    return formatDate(new Date(), 'yyyyMMdd', 'en');
  }

  public static getNextWeekDateString(): string {
    var nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);

    return formatDate(nextWeek, 'yyyyMMdd', 'en');
  }

  public static getDisplayStringForDate(day: String): string {
    return (
      day.substring(4, 6) +
      '. ' +
      day.substring(6, 8) +
      '. ' +
      day.substring(0, 4)
    );
  }

  public static GetNumberFromString(s: string): number {
    if (!s || s === '') return -1;

    return Number(s);
  }

  public static IsValidZIP(value: string): boolean {
    return value != '' && !isNaN(Number(value)) && value.length == 5;
  }

  public static GetInvalidZipError(): string {
    return 'ZIP must be 5 digits';
  }

  public static IsValidEmail(value: string): boolean {
    return FrequentlyUsedService.emailRegExObj.test(value);
  }

  public GetInvalidEmailError(): string {
    return 'Invalid email';
  }

  public static GetDeliveredOilOrderLabel(order: OilOrder): string {
    let labelOrder = `Ordered: ${order.oilGallons} gal`;

    if (order.isFuelAdditive) {
      const galPrice =
        order.oilPricePerGallon + order.fuelAdditivePricePerGallon;
      labelOrder += '\nSuper+';
      labelOrder +=
        `\nDelivered: ${
          order.oilGallons
        } gal\n $${order.orderPreTaxSales.toFixed(2)} ` +
        FrequentlyUsedService.GetPaymentMethodLabel(order.payWithCash) +
        `\n$${galPrice.toFixed(2)}/gal `;
    } else {
      const galPrice = order.oilPricePerGallon;
      labelOrder +=
        `\nDelivered: ${
          order.oilGallons
        } gal\n $${order.orderPreTaxSales.toFixed(2)} ` +
        FrequentlyUsedService.GetPaymentMethodLabel(order.payWithCash) +
        `\n$${galPrice.toFixed(2)}/gal `;
    }
    return labelOrder;
  }

  public static GetPlacedOilOrderLabel(order: OilOrder): string {
    let labelOrder = `${order.oilGallons} gal`;
    if (order.isFuelAdditive) {
      const galPrice =
        order.oilPricePerGallon + order.fuelAdditivePricePerGallon;
      labelOrder += ' Super+';
      labelOrder +=
        ' ($' +
        galPrice.toFixed(2) +
        '/gal), ' +
        FrequentlyUsedService.GetPaymentMethodLabel(order.payWithCash);
    } else {
      const galPrice = order.oilPricePerGallon;
      labelOrder +=
        ` ($${galPrice}/gal), ` +
        FrequentlyUsedService.GetPaymentMethodLabel(order.payWithCash);
    }
    return labelOrder;
  }
}
