import * as DataLoader from 'dataloader';
import { Request, Response } from 'express';
import { Redis } from 'ioredis';
import { User } from 'src/entity/User';
import { Bill } from '../entity/Bill';

export interface MyContext {
  req: Request;
  res: Response;
  redis: Redis;
  userLoader: DataLoader<string, User>;
  billLoader: DataLoader<string, Bill>;
  url: string;
}
