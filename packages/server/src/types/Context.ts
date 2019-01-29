import * as DataLoader from 'dataloader';
import { Request, Response } from 'express';
import { Redis } from 'ioredis';
import { User } from 'src/entity/User';
import { Bill } from '../entity/Bill';
import { billUsersLoader } from '../loaders/billUsersLoader';

export interface MyContext {
  req: Request;
  res: Response;
  redis: Redis;
  userLoader: DataLoader<string, User>;
  billLoader: DataLoader<string, Bill>;
  billUsersLoader: ReturnType<typeof billUsersLoader>;
  url: string;
}
