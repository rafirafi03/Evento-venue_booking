import Redis from 'ioredis';
import { IRedisClient } from '../interfaces/redisInterface';
import dotenv from 'dotenv';

dotenv.config()

export class RedisClient implements IRedisClient {
  private _redis: Redis;

  constructor() {
    this._redis = new Redis({
      host: process.env.REDIS_HOST, 
      port: Number(process.env.REDIS_PORT),
      password: process.env.REDIS_PASS       
      
    });

    this._redis.on('connect', () => {
        console.log('Connected to Redis')
    });

    this._redis.on('error', (err) => {
        console.log('redis error:' , err)
    })
  }

  async store(email: string, otp: string, ttl: number): Promise<void> {
    try {
        await this._redis.setex(`otp:${email}`, ttl, otp);
    } catch (error) {
       console.log(error);
       throw error
    }
  }

  async get(email: string): Promise<string | null> {
    try {
        return await this._redis.get(`otp:${email}`);
    } catch (error) {
        console.log(error); 
        throw error
    }
  }

  async delete(email: string): Promise<void> {
    try {
        await this._redis.del(`otp:${email}`);
    } catch (error) {
        console.log(error)
        throw error
    }
  }
}
