import { User } from './entity/User';
import { BillModel } from './features/bill/model';
import { BillUserModel } from './features/billUser/model';
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
  };
}

export type PaginationArgs = {
  limit?: number;
  after?: string;
};

export type PageInfo = {
  hasNextPage: boolean;
  endCursor: string;
};

export type Edge<T> = {
  node: T;
  cursor: string;
};

export type PaginationConnection<T> = {
  edges: Edge<T>[];
  pageInfo: PageInfo;
};