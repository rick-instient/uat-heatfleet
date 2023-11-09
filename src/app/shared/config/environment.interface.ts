// import { GoogleTagManagerConfig } from "../google-tag-manager/google-tag-manager-config";

export interface DavosEnvironment {
  api_url: string;
  api_mock_url: string;
  api_version: string;
  image_url: string;
  api_key: string;
  tokenization_key: string;
  production: boolean;
  token: string;
  isMobile: boolean;
  // gtmConfig: GoogleTagManagerConfig;
  vendor_url: string;
  client_url: string;
  secure_url:string;
  temp_api_url: string;
  paypalClientId: string;
}
