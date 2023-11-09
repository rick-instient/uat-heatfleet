export interface LoginResponse {
  token: string;
  expiration: Date;
  refreshToken: string;
  privacyConfirmed: boolean;
  role: string;
}

export interface RegisterResponse {
  id: number;
  userName: string;
  email: string;
  deliveryId: any;
}
