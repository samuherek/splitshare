import * as DataLoader from 'dataloader';
import { Request, Response } from 'express';
import { Redis } from 'ioredis';
import { User } from 'src/entity/User';
import { Bill } from '../entity/Bill';
import { billUsersLoader } from '../loaders/billUsersLoader';
import { billInvitesLoader } from '../loaders/billInvitesLoader';
import { receiptSplitsLoader } from '../loaders/receiptSplitsLoader';
import { receiptLoader } from '../loaders/receiptLoader';

export interface MyContext {
  req: Request;
  res: Response;
  redis: Redis;
  userLoader: DataLoader<string, User>;
  billLoader: DataLoader<string, Bill>;
  billUsersLoader: ReturnType<typeof billUsersLoader>;
  billInvitesLoader: ReturnType<typeof billInvitesLoader>;
  receiptLoader: ReturnType<typeof receiptLoader>;
  receiptSplitsLoader: ReturnType<typeof receiptSplitsLoader>;
  url: string;
}
