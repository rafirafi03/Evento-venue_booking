export interface IRedisClient {
    storeOTP(email: string, otp: string, ttl: number): Promise<void>;
    getOTP(email: string): Promise<string | null>;
    deleteOTP(email: string): Promise<void>;
  }
  