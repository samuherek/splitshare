import { Request } from 'express';
import { Redis } from 'ioredis';

export interface MyContext {
  req: Request;
  redis: Redis;
  session: any;
}
