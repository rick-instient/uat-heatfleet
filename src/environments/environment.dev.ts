// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { DavosEnvironment } from 'src/app/shared/config/environment.interface';
// import { GoogleTagManagerConfig } from 'src/shared/google-tag-manager/google-tag-manager-config';
export type DavosStaging = 'localhost' | 'dev' | 'uat' | 'main';
export enum DavosStagings {
  Localhost = 'uat',
  Dev = 'dev',
  Uat = 'uat',
  Prod = 'main',
}


export class DavosEnvironmentClass {
  // public stage: any = process.env.DAVOS_ENV || DavosStagings.Dev;
  public stage: DavosStaging = DavosStagings.Dev;

  public get api_url(): string {
    return this[this.stage].api_url;
  }
  public get image_url(): string {
    return this[this.stage].image_url;
  }
  public get api_version(): string {
    return this[this.stage].api_version;
  }
  public get api_key(): string {
    return this[this.stage].api_key;
  }
  public get api_mock_url(): string {
    return this[this.stage].api_mock_url;
  }
  public get production(): boolean {
    return this[this.stage].production;
  }
  public get token(): string {
    return this[this.stage].token;
  }
  public set token(token: string) {
    this[this.stage].token = token;
  }

  public get vendor_url(): string {
    return this[this.stage].vendor_url;
  }

  public get temp_api_url(): string {
    return this[this.stage].temp_api_url;
  }

  public get client_url(): string {
    return this[this.stage].client_url;
  }

  public get secure_url(): string {
    return this[this.stage].secure_url;
  }

  
  public get paypalClientId(): string {
    return this[this.stage].paypalClientId;
  }

  public get tokenization_key(): string {
    return this[this.stage].tokenization_key;
  }
  public set tokenization_key(token: string) {
    this[this.stage].tokenization_key = token;
  }
  public get isMobile(): boolean {
    return this[this.stage].isMobile;
  }
  // public get gtmConfig(): GoogleTagManagerConfig {
  //   return this[this.stage].gtmConfig;
  // }

  protected localhost: DavosEnvironment = {
    production: false,
    api_url: 'https://dev-api.heatfleet.com/api/',
    image_url: 'http:/localhost:5000/uploads/',
    api_version: '1.0',
    api_key: 'oiwe43raiasdl4kha6sdf123',
    api_mock_url: 'http://localhost:3000/',
    tokenization_key: '24x5CN-Y34yun-9cy3V7-t5MAZ2',
    token: '',
    isMobile: false,
    // gtmConfig: {
    //   id: 'GTM-MGKM89S',
    // },
    vendor_url: 'https://dev-vendor.heatfleet.com/',
    temp_api_url: 'https://heatingoilfinder-dev-api-hf.sigmanet.info/',
    client_url: 'https://dev.heatfleet.com/',
    secure_url: 'https://dev-secure.heatfleet.com/',
    paypalClientId:
      'AcFQTHo45inLdsXIgxTqiPRQiHyHJWynxvJTnSjJWVuMc6eyuNTP_edPjghjHAhC2gK8dbPjhACWwdIx',
  };
  protected dev: DavosEnvironment = {
    production: false,
    api_url: 'https://dev-api.heatfleet.com/api/',
    image_url: 'https://heatfleet.com/uploads/',
    api_version: '1.0',
    api_key: 'oiwe43raiasdl4kha6sdf123',
    api_mock_url: 'http://localhost:3000/',
    tokenization_key: '24x5CN-Y34yun-9cy3V7-t5MAZ2',
    token: '',
    isMobile: false,
    // gtmConfig: {
    //   id: 'G-H23CPLTTDD',
    // },
    vendor_url: 'https://dev-vendor.heatfleet.com/',
    temp_api_url: 'https://heatingoilfinder-dev-api-hf.sigmanet.info/',
    client_url: 'https://dev.heatfleet.com/',
    secure_url: 'https://dev-secure.heatfleet.com/',
    paypalClientId:
      'AcFQTHo45inLdsXIgxTqiPRQiHyHJWynxvJTnSjJWVuMc6eyuNTP_edPjghjHAhC2gK8dbPjhACWwdIx',
  };
  protected uat: DavosEnvironment = {
    production: false,
    api_url: 'https://uat-api.heatfleet.com/api/',
    image_url: 'https://b.heatfleet.com/uploads/',
    api_version: '1.0',
    api_key: 'oiwe43raiasdl4kha6sdf123',
    api_mock_url: 'http://localhost:3000/',
    tokenization_key: '24x5CN-Y34yun-9cy3V7-t5MAZ2',
    // tokenization_key: "922Z9E-q4QWUc-2j2968-c2Fx28",
    token: '',
    isMobile: false,
    // gtmConfig: {
    //   id: 'G-H23CPLTTDD',
    // },
    vendor_url: 'https://uat-vendor.heatfleet.com/',
    temp_api_url: 'https://heatingoilfinder-dev-api-hf.sigmanet.info/',
    client_url: 'https://uat.heatfleet.com/',
    secure_url: 'https://uat-secure.heatfleet.com/',
    paypalClientId:
      'AVd9gVKUYrf1BAU0M2gRAebZcl4IH7G_FZ4_HsW_YGD1WXHagnH7J5EGvS7GS2KNY680njuGYmEH7rAR',
  };
  protected main: DavosEnvironment = {
    production: true,
    api_url: 'https://api.heatfleet.com/api/',
    image_url: 'http://vendor.davos.test.erise.hu/uploads/',
    api_version: '1.0',
    api_key: 'oiwe43raiasdl4kha6sdf123',
    api_mock_url: 'http://localhost:3000/',
    tokenization_key: '922Z9E-q4QWUc-2j2968-c2Fx28',
    token: '',
    isMobile: false,
    // gtmConfig: {
    //   id: 'G-H23CPLTTDD',
    // },
    vendor_url: 'https://vendor.heatfleet.com/',
    temp_api_url: 'https://api.heatingoilfinder.com/',
    client_url: 'https://heatfleet.com/',
    secure_url: 'https://secure.heatfleet.com/',
    paypalClientId:
      'AVd9gVKUYrf1BAU0M2gRAebZcl4IH7G_FZ4_HsW_YGD1WXHagnH7J5EGvS7GS2KNY680njuGYmEH7rAR',
  };
}

export const environment: DavosEnvironmentClass = new DavosEnvironmentClass();

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
