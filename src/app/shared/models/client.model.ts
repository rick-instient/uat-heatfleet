import { AccountServiceResponse, Service } from "./general.model";

export interface ZipCodeCheckResponse {
  zipCodeExists: boolean;
  zipCode: string;
  county: string;
  state: string;
  city: string;
  fips: string;
  isMultipleFips: boolean;
  isDealAvailable: boolean;
  allFips: FIPSCode[];
  galSizes: GalSizeItem[];
  isSuspiciousUser: any;
  minimumQuantity: number;
  logoUrls: any;
  suspiciousCities: any;
  fipS_Code: any;
  county_Name: any;
  isValidUSZip: any;
}
export interface FIPSCode {
  fipS_Code: any;
  county_Name: any;
}
export interface TankSizesResponse {
  galSizes: GalSizeItem[];
}

export interface GalSizeItem {
  id: number;
  name: string;
  tankSize: number;
}

export interface HomeDataResponse {
  oilPrice: number;
  flatFee: number;
  isFlatFee: boolean;
  tankSize: number;
  estimatedPrice: number;
  services: AccountServiceResponse[];
  activeOrders: Order[];
  nextOilDeliveryDateName: string;
  nextOilDeliveryDateWeekDay: number;
  nextOilDeliveryDay: string;
  nextOilDeliveryDayId: string;
  minimalAmount: number;
}

export interface DeliveryWindowResponse {
  days: Day[];
}

export interface Day {
  dayName: string;
  day: string;
  dayId: string;
  dayWindow: string;
  bestCardPrice: boolean;
  from: number;
  fromFlatDeliveryFee: number;
  bestCashPrice: boolean;
  fromCash: number;
  fromCashFlatDeliveryFee: number;
  cashPriceAvailable: boolean;
  cardPriceAvailable: boolean;
}

export interface Order {
  name: string;
  scheduledDate: string;
  payedPrice: number;
}

export interface ForgetPasswordResponse {
  email: string;
}
export interface ResetPasswordResponse {
  email: string;
}
export interface ActivateUserResponse {
  email: string;
}

export interface RegisterVendorResponse {
  id: string;
  userName: string;
}
export interface RegisterVendor {
  Name: string;
  Email: string;
  LastName: string;
  FirstName: string;
  ContactPhone: string;
  RegistrationNumber: string;
}
export interface SendCompanyLogoResponse {
  fileName: string;
}

export interface UserDataResponse {
  is: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface OilProvidersResponse {
  providers: OilProvider[];
  flashSaleProvider: OilProvider;
  isSuspiciousUser: any;
  suspiciousCities: any;
}

export interface OilProviderResponse {
  provider: OilProvider;
}
export interface FlashSaleActiveResponse {
  isFlashSaleActive: boolean;
  companyId: number;
}

export interface OilProvider {
  companyId: number;
  name: string;
  description: string;
  price: number;
  premiumFuelAdditivePrice: number;
  enablePremiumFuelAdditive: boolean;
  flatFee: number;
  isFlatFee: boolean;
  calculatedPrice: number;
  bestPrice: boolean;
  shortDescription: String;
  state: string;
  city: string;
  dayId: any;
  isPayWithCash: any;
  firstDay: any;
  cashDiscount: any;
  logoUrl: any;
  isFirstTier: any;
}

export interface ServiceProvidersResponse {
  providers: ServiceProvider[];
}

export interface ServiceProvider {
  serviceId: number;
  name: string;
  description: string;
  price: number;
  companyId: number;
  bestPrice: boolean;
}
