export interface ILoginResponse {
  success: boolean;
  token?: string;
  refreshToken?: string;
  error?: string;
}

export interface IOtpData {
  otp: string;
  userName: string;
  email: string;
  phone: number;
  password: string;
}
