import { User } from './entity/User';
import { BillModel } from './features/bill/model';
import { BillUserModel } from './features/billUser/model';
import { Email } from './features/email/invite';
import { NotificationModel } from './features/notification/model';
import { ReceiptModel } from './features/receipt/model';
import { UserModel } from './features/user/model';

export interface MyContext {
  req: Request;
  res: Response;
  user: User;
  models: {
    User: UserModel;
    Bill: BillModel;
    BillUser: BillUserModel;
    Receipt: ReceiptModel;
    Notification: NotificationModel;
    Email: Email;
  };
}

export type PaginationArgs = {
  limit?: number;
  after?: string;
};

export type PageInfo = {
  hasNextPage: boolean;
  endCursor: string;
  itemsCount: number;
};

export type Edge<T> = {
  node: T;
  cursor: string;
};

export type PaginationConnection<T> = {
  edges: Edge<T>[];
  pageInfo: PageInfo;
};
