import { User } from '../user/entity';
import { BillUser } from './entity';

type BillUserJoin = BillUser & {
  __user__: User;
};

export function remap(billUser: BillUser) {
  const next = billUser as BillUserJoin;
  return {
    ...next.__user__,
    ...next,
  };
}

export function getInviteId(billUser: BillUser) {
  return `${billUser.billId}-${billUser.userId}`;
}
