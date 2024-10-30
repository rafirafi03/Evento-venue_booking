export interface IRedisClient {
    store(email: string, otp: string, ttl: number): Promise<void>;
    get(email: string): Promise<string | null>;
    delete(email: string): Promise<void>;
  }
  