import Redis from 'ioredis';
import { IRedisClient } from '../interfaces';

require('dotenv').config()

export class RedisClient implements IRedisClient {
  private redis: Redis;

  constructor() {
    this.redis = new Redis({
      host: process.env.REDIS_HOST, 
      port: Number(process.env.REDIS_PORT),
      password: process.env.REDIS_PASS       
      
    });

    this.redis.on('connect', () => {
        console.log('Connected to Redis')
    });

    this.redis.on('error', (err) => {
        console.log('redis error:' , err)
    })
  }

  async storeOTP(email: string, otp: string, ttl: number): Promise<void> {
    try {
        await this.redis.setex(`otp:${email}`, ttl, otp);
    } catch (error) {
       console.log(error);
    }
  }

  async getOTP(email: string): Promise<string | null> {
    try {
        return await this.redis.get(`otp:${email}`);
    } catch (error) {
        console.log(error); 
        return null
    }
  }

  async deleteOTP(email: string): Promise<void> {
    try {
        await this.redis.del(`otp:${email}`);
    } catch (error) {
        console.log(error)
    }
  }
}
