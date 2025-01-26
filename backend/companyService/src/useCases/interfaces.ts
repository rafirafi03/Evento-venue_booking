export interface ILoginResponse {
    success: boolean;
    token?: string;
    refreshToken?: string;
    error?: string;
    message?: string;
  }