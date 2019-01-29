import * as DataLoader from 'dataloader';
import { In } from 'typeorm';
import { User } from '../entity/User';
import { BillUser } from '../entity/BillUser';

const batchUsers = async (billIds: string[]) => {
  const billUsers = await BillUser.find({
    join: {
      alias: 'billUser',
      innerJoinAndSelect: {
        user: 'billUser.user',
      },
    },
    where: {
      billId: In(billIds),
    },
  });

  const billIdToUsers: { [key: string]: User[] } = {};
  /*
  Example of a response from the join table ;(
  {
    authorId: 1,
    bookId: 1,
    __author__: { id: 1, name: 'author1' }
  }
  */
  billUsers.forEach(bu => {
    if (bu.billId in billIdToUsers) {
      billIdToUsers[bu.billId].push((bu as any).__user__);
    } else {
      billIdToUsers[bu.billId] = [(bu as any).__user__];
    }
  });

  return billIds.map(billId => billIdToUsers[billId]);
};

export const billUsersLoader = () => new DataLoader(batchUsers);
