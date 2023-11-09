
import { DTOState } from '../api';
import {
  CustomerTaxType,
  DayStatus,
  FlashSaleType,
  OrderStatus,
  PaymentState,
  PaymentType,
  ServiceType,
  TruckType,
} from './types';
export * from './types';
export interface Cart {
  isZipChanged: boolean;
  isMultipleFips: boolean;
  isDealAvailable: boolean;
  flatDeliveryFee: number;
  isFlashSale: boolean;
  isFlatDeliveryFee: boolean;
  isFuelAdditive: boolean;
  serviceName: string;
  price: number;
  companyName: string;
  amount: number;
  zipCode: any;
  userId: number;
  tankSize: number;
  customerType: number;
  orderType: number;
  serviceId: number;
  companyId: number;
  deliveryDay: string;
  isTermsAccepted: boolean;
  isUpsale: boolean;
  payWithCash: boolean;
  city: string;
  address: string;
  state: string;
  county: string;
  fipsCode: string;
  token: string;
  flatFee: any;
  isFlatFee: any;
}
export interface AccountZonesResponse {
  oilDelivery: OilDelivery;
  service: Service;
  serviceInvalidZip: string[];
  zone1InvalidZip: string[];
  zone2InvalidZip: string[];
}
export interface PricesResponse {
  companyId: number;
  basePrice: number;
  flatDeliveryFee: number;
  tiers: PriceTier[];
  enableFlashSale: boolean;
  flashSaleLimit: number;
  flashSaleDiscount: number;
  flashSaleType: FlashSaleType;
}

export interface AccountPriceTiersResponse {
  tiers: PriceTier[];
}

export interface AccountServicesResponse {
  services: AccountServiceResponse[];
}

export interface AccountTeamDriversResponse {
  users: User[];
}
export interface CompanyDetailsResponse {
  id: number;
  name: string;
  description: string;
  companyLogo: string;
  contactPhone: string;
  contactPhoneFormated: string;
  termsOfDelivery: string;
}
export interface PriceCalculation {
  amount: number;
  price: number;
  flashSaleDiscount: number;
  flatDeliveryFee: number;
  fuelAdditivePriceInCent: boolean;
  isFlashSaleDiscount: boolean;
  isFlatDeilvery: boolean;
  isFuelAdditive: boolean;
  lowestGalPrice: number;
  originalGalPrice: number;
  calculatedPrice: number;
  payWithCash: boolean;
  cashDiscount: number;
}
export interface CalculationResponse {
  orderId: number;
  calculation: OilOrder;
  oilOrderParameters: OrderOilObject;
  price: number;
  amount: number;
  orderType: ServiceType;
}

export interface ServiceDetailsResponse {
  id: number;
  type: ServiceType;
  name: string;
  teaser: string;
  description: string;
  terms: string;
  price: number;
  priceMeta: string;
  isUpsaleOffer: boolean;
  upsaleOfferName: string;
  upsaleOfferPrice: number;
  companyId: number;
  companyName: string;
  active: boolean;
}

export interface DeliveryAddressResponse {
  userId: number;
  deliveryStreet1: string;
  deliveryStreet2: string;
  deliveryCity: string;
  deliveryState: string;
  deliveryZIP: string;
  customerTaxType: string;
  Id: number;
  billingAddressSameAsDeliveryAddress: boolean;
  deliveryCounty: string;
  deliveryFIPS: string;
  deliveryNickName: string;
  oilTaxexempt: boolean;
  base64: string;
}

export interface DeliveryDetailsResponse {
  userId: number;
  fillLocationDescription: string;
  houseDescription: string;
  tankPosition: number;
  tankLocation: number;
  propertyArea: number;
  termostatTemperature: number;
}

export interface BillingAddressResponse {
  userId: number;
  billingAddressSameAsDeliveryAddress: boolean;
  billingStreet1: string;
  billingStreet2: string;
  billingCity: string;
  billingState: string;
  billingZIP: string;
}
export interface AccountCompanySettingsResponse {
  id: string;
  name: string;
  description: string;
  street1: string;
  street2: string;
  city: string;
  state: string;
  zip: string;
  contactPhone: string;
  companyLogo: string;
  registrationNumber: string;
  termsOfDelivery: string;
  enablePremiumFuelAdditive: boolean;
  enableCashDiscount: boolean;
  cashDiscount: number;
}

export interface OilDelivery {
  zone1: ZipCode[];
  zone2: ZipCode[];
  days: Day[];
  openDays: number;
}

export interface Service {
  zipCodes: ZipCode[];
  days: ServiceDay[];
  openDays: number;
  tuneUps: boolean;
  serviceCalls: boolean;
}

export interface ZipCode {
  zipCode: string;
  dtoState: DTOState;
  adjustment: number;
}

export interface Day {
  day: number;
  opened: number;
}

export interface ServiceDay {
  day: number;
  opened: number;
}

export interface PriceTier {
  from: number;
  id: number;
  price: number;
  dtoState: DTOState;
}

export interface AccountServiceResponse {
  id: number;
  type: number;
  name: string;
  teaser: string;
  description: string;
  terms: string;
  price: number;
  isUpsaleOffer: boolean;
  upsaleOfferName: string;
  upsaleOfferPrice: number;
}

export interface User {
  id: number;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  roleName: string;
  active: boolean;
}

export interface PlaceOrderResponse {
  id: number;
  isError: boolean;
  errorMessage: string;
  errorDetails: string;
}
export interface ComissionSetting {
  fuelAdditiveComissionInDolar: number;
  id: number;
  oilComission: number;
  oilComissionInDolar: number;
  oilComissionInPercent: number;
  paymentProviderComission: number;
  paymentProviderComissionInPercent: number;
  serviceComission: number;
  serviceComissionInPercent: number;
}
export interface OilOrder {
  applicablePetroleumBusinessTax: number;
  applicableSalesTaxRate: number;
  comissionSettings: ComissionSetting;
  countyTaxExemptDavosCollectedRevenue: number;
  countyTaxExemptVendorCollectedRevenue: number;
  countyTaxInPercent: number;
  davosExcemptComission: number;
  davosGrossSales: number;
  davosMarginComission: number;
  davosPretaxSales: number;
  davosRemitsToCounty: number;
  davosRemitsToState: number;
  davosRemitsToVendor: number;
  flatDeliveryFee: number;
  fuelAdditiveComission: number;
  fuelAdditiveComissionValue: number;
  fuelAdditiveGallons: number;
  fuelAdditivePricePerGallon: number;
  fuelAdditiveSales: number;
  isFlatDeliveryFee: boolean;
  isFuelAdditive: boolean;
  oilComission: number;
  oilComissionDolar: number;
  oilComissionDolarValue: number;
  oilComissionPercent: number;
  oilComissionPercentValue: number;
  oilGallons: number;
  oilPricePerGallon: number;
  oilSales: number;
  orderPreTaxSales: number;
  orderTotal: number;
  payWithCash: boolean;
  paymentProviderComission: number;
  paymentProviderComissionInPercent: number;
  petroleumBusinessTax: number;
  remitsToPaymentProvider: number;
  salesTax: number;
  taxCode: string;
  stateTaxExemptDavosCollectedRevenue: number;
  stateTaxExemptVendorCollectedRevenue: number;
  totalDavosCollectedRevenue: number;
  totalDavosComission: number;
  totalVendorCollectedRevenue: number;
  vendorGrossSales: number;
  vendorPretaxSales: number;
  vendorRemitsToCounty: number;
  vendorRemitsToState: number;
}
export interface OrderOilObject {
  cashDiscount: number;
  countyTax: number;
  flashSaleDiscount: number;
  flatDeliveryFee: number;
  fuelAdditivePriceInCent: number;
  isFlashSaleDiscount: boolean;
  priceTiers: string;
  stateTax: number;
  zipCode: string;
  deliveredOrder: OilOrder;
  placedOrder: OilOrder;
  salesTax: any;
  taxCode: any;
  applicableSalesTaxRate: any;
  orderPreTaxSales: any;
  isFlatDeliveryFee: any;
  orderTotal: any;
  petroleumBusinessTax: any;
  applicablePetroleumBusinessTax: any;
  oilGallons: any;
  isFuelAdditive: any;
  payWithCash: any;
}
export interface OrderServiceObject {
  additionalComission: number;
  additionalPayWithCash: boolean;
  additionalServicePrice: number;
  additionalServiceSales: number;
  additionalServiceSalesTax: number;
  applicableCountyTaxRate: number;
  applicableStateTaxRate: number;
  baseComission: number;
  baseCountyTax: number;
  baseServicePrice: number;
  baseServiceSales: number;
  baseStateTax: number;
  comissionSettings: ComissionSetting;
  davosExemptComission: number;
  davosGrossSale: number;
  davosMarginComission: number;
  davosPretaxSale: number;
  isUpsale: boolean;
  name: string;
  orderTotal: number;
  payWithCash: boolean;
  paymentProviderComission: number;
  paymentProviderComissionInPercent: number;
  serviceComissionInPercent: number;
  serviceId: number;
  totalComission: number;
  vendorGrossSale: number;
  vendorPretaxSale: number;
  zipCode: string;
  taxTotal: number;
  baseSalesTax: any;
  taxCode: any;
}
export interface OrderDetailsResponse {
  id: number;
  companyId: number;
  company: CompanyDetailsResponse;
  name: string;
  orderType: ServiceType;
  payWithCash: boolean;
  price: number;
  deliveryDay: string;
  amount: number;
  deliveryStreet1: string;
  deliveryStreet2: string;
  deliveryCity: string;
  deliveryState: string;
  deliveryZIP: string;
  billingAddressSameAsDeliveryAddress: boolean;
  billingStreet1: string;
  billingStreet2: string;
  billingCity: string;
  billingState: string;
  illingZIP: string;
  tankSize: number;
  lastUpdatedAt: Date;
  closeDate: Date;
  createdAt: Date;
  oilOrderParameters: OrderOilObject;
  serviceOrderParameters: OrderServiceObject;
  status: OrderStatus;
  transactionId: string;
  paymentTransactions: PaymentTransaction[];
  deliveryCounty: string;
  billingZIP: string;
  billingCounty: string;
  placedOrder: any;
  paymentType: any;
}

export interface OrderResponse {
  id: number;
  name: string;
  companyId: number;
  userId: number;
  status: OrderStatus;
  customerTaxType: number;
  orderType: ServiceType;
  payWithCash: boolean;
  price: number;
  serviceId: number;
  deliveryDay: string;
  isUpsale: boolean;
  amount: number;
  lastUpdatedAt: Date;
  createdAt: Date;
}

export interface OrderStatusResponse {
  id: number;
  status: OrderStatus;
}

export interface CustomerSettingsResponse {
  userId: number;
  phoneNumber: string;
  email: string;
  firstName: string;
  lastName: string;
  customereTaxType: CustomerTaxType;
  backupPhoneNumber: string;
  deliveryStreet1: string;
  deliveryStreet2: string;
  deliveryCity: string;
  deliveryState: string;
  deliveryZIP: string;
  billingAddressSameAsDeliveryAddress: boolean;
  billingStreet1: string;
  billingStreet2: string;
  billingCity: string;
  billingState: string;
  billingZIP: string;
  houseDescription: string;
  fillLocationDescription: string;
  tankSize: number;
  tankPosition: number;
  tankLocation: number;
  propertyArea: number;
  termostatTemperature: number;
  deliveryCounty: string;
  deliveryFIPS: string;
}

export interface DeliveryCalendarResponse {
  days: CalendarDay[];
  daysOil: CalendarOilDay[];
  daysService: CalendarServiceDay[];
  maxOilTrucks: number;
  maxServiceTrucks: number;
  todayId: string;
  serverTime: string;
}

export interface CalendarDay {
  dayId: string;
  name: string;
  dayName: string;
  dayOfWeek: number;
}

export interface CalendarOilDay {
  dayId: string;
  dayStatus: DayStatus;
  companyId: number;
  day: number;
  zone1Enabled: boolean;
  zone2Enabled: boolean;
  flashSaleEnabled: boolean;
  flashDiscount: number;
  orders: CalendarOilOrder;
  trucks: TruckDayStat[];
}

export interface TruckDayStat {
  truckId: number;
  tuckName: string;
  scheduledOrders: number;
  completedOrders: number;
  canceledOrders: number;
}
export interface CalendarServiceDay {
  dayId: string;
  dayStatus: number;
  companyId: number;
  day: number;
  tuneUpEnabled: boolean;
  serviceEnabled: boolean;
  orders: CalendarServiceOrder[];
  trucks: TruckDayStat[];
}

export interface CalendarOilOrder {
  id: number;
  name: string;
  companyId: number;
  userId: number;
  userEmail: string;
  userFirstName: string;
  userLastName: string;
  userContactPhone: string;
  status: number;
  payWithCash: boolean;
  price: number;
  amount: number;
  deliveryStreet1: string;
  deliveryStreet2: string;
  deliveryCity: string;
  deliveryState: string;
  deliveryZIP: string;
  scheduleDays: ScheduleDay[];
  selectedScheduleDay: ScheduleDay;
  clickedDayId: string;
  selectedTruck: Truck;
}

export interface CalendarServiceOrder {
  id: number;
  name: string;
  companyId: number;
  userId: number;
  userEmail: string;
  userFirstName: string;
  userLastName: string;
  userContactPhone: string;
  status: number;
  price: number;
  orderType: number;
  serviceId: number;
  deliveryDay: string;
  isUpsale: boolean;
  deliveryStreet1: string;
  deliveryStreet2: string;
  deliveryCity: string;
  deliveryState: string;
  deliveryZIP: string;
  scheduleDays: ScheduleDay[];
  selectedScheduleDay: ScheduleDay;
  selectedTruck: Truck;
}

export interface ScheduleDay {
  dayId: string;
  name: string;
  dayName: string;
  dayOfWeek: number;
  isOpenDay: boolean;
  isLate: boolean;
  isSelected: boolean;
}

export interface TrucksResponse {
  trucks: Truck[];
}

export interface Truck {
  id: number;
  name: string;
  volume: string;
  type: TruckType;
  active: boolean;
  deleted: boolean;
  userId: number;
}
export interface TruckDriver {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
}
export interface TruckDriversResponse {
  drivers: TruckDriver[];
}
export interface TruckEdit extends Truck {
  userId: number;
  availableDrivers: TruckDriver[];
}

export interface CompanyOrderBase {
  id: number;
  companyId: number;
  userId: number;
  status: number;
  name: string;
  price: number;
  deliveryStreet1: string;
  deliveryStreet2: string;
  deliveryCity: string;
  deliveryState: string;
  deliveryZIP: string;
  deliveryCounty: string;
  deliveryFips: string;
  userEmail: string;
  userFirstName: string;
  userLastName: string;
  userContactPhone: string;
  billingAddressSameAsDeliveryAddress: boolean;
  billingStreet1: string;
  billingStreet2: string;
  billingCity: string;
  billingState: string;
  billingZIP: string;
  billingCounty: string;
  billingFips: string;
  truckId: number;
  truck: Truck;
  scheduleDays: ScheduleDay[];
  scheduledDay: string;
  deliveryWindowToDay: string;
  scheduledDayData: CalendarDay;
  transactionId: string;
  stateTax: number;
  countyTax: number;
  payWithCash: boolean;
  stateTaxValue: number;
  countyTaxValue: number;
  orderType: number;
  selectedScheduleDay: ScheduleDay;
}

export interface CompanyOilOrder extends CompanyOrderBase {
  amount: number;
  payWithCash: boolean;
  houseDescription: string;
  fillLocationDescription: string;
  tankSize: number;
  tankPosition: number;
  tankLocation: number;
  propertyArea: number;
  termostatTemperature: number;
  isFuelAdditive: boolean;
  fuelAdditivePriceInCent: number;
  deliveredAmount: number;
  deliveredPrice: number;
  galPrice: number;
  paymentTransactions: PaymentTransaction[];
}
export interface PaymentTransaction {
  state: PaymentState;
  type: PaymentType;
  amount: number;
  parentTransaction: number;
  transactionDate: Date;
  gatewayTransactionId: string;
}
export interface CompanyOilGiveupOrder extends CompanyOilOrder {
  oilOrderParameters: OrderOilObject;
}

export interface CompanyServiceOrder extends CompanyOrderBase {
  serviceId: number;
  deliveryDay: string;
  isUpsale: boolean;
  serviceOrderParameters: OrderServiceObject;
  paymentTransactions: PaymentTransaction[];
}
export interface Transaction {
  transactionId: string;
  email: string;
  firstName: string;
  lastName: string;
  deliveryStreet1: string;
  deliveryStreet2: string;
  deliveryCity: string;
  deliveryState: string;
  deliveryZIP: string;
  orderId: number;
  companyId: number;
  grossTotal: number;
  zipCode: string;
  stateTax: number;
  statetaxValue: number;
  countyTax: number;
  countyTaxValue: number;
  netTotal: number;
  comission: number;
  comissionValue: number;
  lastUpdatedAt: Date;
  payWithCash: boolean;
  orderType: ServiceType;
  customerTaxType: CustomerTaxType;
  isWarrning: boolean;
  warrningMessage: string;
}
export interface Month {
  monthId: string;
  month: string;
}
export interface TransactionsResponse {
  transactions: Transaction[];
  availableMonths: Month[];
}

export interface DayDataResponse {
  day: CalendarDay;
  oilOrders: CompanyOilOrder[];
  serviceOrders: CompanyServiceOrder[];
  oilDaySetting: CalendarOilDay;
  serviceDaySetting: CalendarServiceDay;
  oilTrucks: Truck[];
  serviceTrucks: Truck[];
  selectedTruckId: number;
}
export interface ActiveOrdersResponse {
  oilOrders: CompanyOilOrder[];
  serviceOrders: CompanyServiceOrder[];
  oilTrucks: Truck[];
  serviceTrucks: Truck[];
  selectedTruckId: number;
}
export interface OverdueOrdersResponse {
  oilOrders: CompanyOilOrder[];
  serviceOrders: CompanyServiceOrder[];
}

export interface ClientUserShort {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

export interface ClientUser extends ClientUserShort {
  customerTaxType: number;
  backupPhoneNumber: string;
  deliveryStreet1: string;
  deliveryStreet2: string;
  deliveryCity: string;
  deliveryState: string;
  deliveryZIP: string;
  billingAddressSameAsDeliveryAddress: boolean;
  billingStreet1: string;
  billingStreet2: string;
  billingCity: string;
  billingState: string;
  billingZIP: string;
  houseDescription: string;
  fillLocationDescription: string;
  tankSize: number;
  tankPosition: number;
  tankLocation: number;
  propertyArea: number;
  termostatTemperature: number;
}

export interface NewServiceParameters {
  zipCodes: OpenedZipCode[];
  services: ServiceDetailsResponse[];
  availableTrucks: Truck[];
}

export interface NewOilParameters {
  zipCodes: OpenedZipCode[];
  availableTrucks: Truck[];
  isFuelAdditive: boolean;
  fuelAdditivePrice: number;
}

export interface OpenedZipCode {
  zipCode: string;
  county: string;
  state: string;
  city: string;
}

export interface NavigationHistoryItem {
  id: string;
  label: string;
  url: string;
}

export type LocationType = 'default' | 'state-selection' | 'state-profile' | 'town-profile' | 'company-profile' | 'counties-selection' | 'town-selection';