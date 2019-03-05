import { lstatSync, readdirSync, readFileSync, writeFileSync } from 'fs';
import { get } from 'lodash';
import { basename, join, resolve } from 'path';
import { getConnection } from 'typeorm';
import { createTypeormConn } from '../createTypeormConn';
import { Receipt } from '../entity/Receipt';
import { ReceiptSplit } from '../entity/ReceiptSplit';
import { User } from '../entity/User';
import updateBillTimestamp from '../utils/updateBill';

const baseDest = resolve(
  __dirname,
  '..',
  '..',
  '..',
  '..',
  '..',
  'fire-app/backup/nov_2018/'
);

// @ts-ignore
// const billId = '5a760cc7-f62d-4eb4-b81b-1164072bf204';
// @ts-ignore
const userEmails = {
  JeRsuIzqy9L3bOWMDBcb: {
    email: 'samuherekbiz@gmail.com',
    id: 'fd3530fe-55a2-459d-89db-9e3b8e86e584',
  },
  k6kYznyeyEDZ2MT2nttp: {
    email: 'evamoorman@live.nl',
    id: '58b224a8-5dac-42c5-a1b6-2b1543573746',
  },
};

// const userEmails = {
//   JeRsuIzqy9L3bOWMDBcb: {
//     email: 'samuherekbiz@gmail.com',
//     id: '0fad1cd5-71af-4fd8-bd05-3b6b4aad9a57',
//   },
//   k6kYznyeyEDZ2MT2nttp: {
//     email: 'evamoorman@live.nl',
//     id: 'db1e4f56-b589-4e76-b795-c0a45071f60a',
//   },
// };

// @ts-ignore
const initUsers = async () => {
  await createTypeormConn();

  const users = getBackupUsers();
  users.forEach(async u => {
    const user = await User.findOne({ where: { email: u.email } });
    // console.log(u.createdAt, user);
    if (user) {
      const res = await getConnection()
        .createQueryBuilder()
        .update(User)
        .set({
          displayName: u.displayName,
          photoUrl: u.photoUrl,
          createdAt: u.createdAt,
          confirmed: true,
        })
        .where('id = :id', { id: user.id })
        .execute();
      console.log(res);
    }
  });
};

// @ts-ignore
const getBackupUsers = () => {
  const dest = resolve(baseDest, 'users');

  const users = readdirSync(dest)
    .map(name => join(dest, name))
    .filter(source => lstatSync(source).isDirectory())
    .map(source => {
      const dir = basename(source);
      return parseFile(resolve(dest, dir, `${dir}.json`));
    });

  return users.map((u: any) => {
    return {
      displayName: u.displayName.value,
      email: u.email.value,
      photoUrl: u.photoUrl.value,
      createdAt: u.createdAt.value,
      confirmed: false,
      password: u.email.value,
    };
  });
};

// @ts-ignore
function receiptsToFile2() {
  const dest = resolve(baseDest, 'bills/YPnGBCLDB235PjUeoKV4/receipts');
  const receipts = readdirSync(dest)
    .map(name => join(dest, name))
    .filter(source => lstatSync(source).isDirectory())
    .map(source => {
      const dir = basename(source);
      return parseFile(resolve(dest, dir, `${dir}.json`));
    });

  const file = resolve(__dirname, 'receipts.json');
  writeFileSync(file, JSON.stringify(receipts));
}

// @ts-ignore
function receiptsToFile() {
  const file = resolve(__dirname, 'receipts.json');
  const file2 = resolve(__dirname, 'receipts2.json');
  const res = JSON.parse(readFileSync(file, { encoding: 'utf-8' }));
  const next: any = [];

  res.forEach((r: any) => {
    try {
      const splits = [];
      for (let i = 0; i < 2; i++) {
        const split = get(r, `splits['${String(i)}']`, null);
        if (split) {
          splits.push({
            value: get(split, 'amount.value', 0),
            currency: get(split, 'currency.value', 'EUR'),
            userId:
              // @ts-ignore
              userEmails[get(split, 'uid.value', 'JeRsuIzqy9L3bOWMDBcb')].id,
          });
        }
      }

      const item = {
        ...r,
        category: get(r, 'category.value', ''),
        city: get(r, 'city.value', ''),
        comment: get(r, 'comment.value', ''),
        country: get(r, 'country.value', ''),
        company: get(r, 'company.value', ''),
        createdAt: get(r, 'createdAt.value', ''),
        creatorId:
          // @ts-ignore
          userEmails[get(r, 'createdBy.value', 'JeRsuIzqy9L3bOWMDBcb')].id,
        currency: get(r, 'currency.value', 'EUR'),
        // @ts-ignore
        paidById: userEmails[get(r, 'paidBy.value', 'JeRsuIzqy9L3bOWMDBcb')].id,
        paidAt: get(r, 'paidDate.value', new Date()),
        total: get(r, 'total.value', 0),
        splits,
      };
      next.push(item);
    } catch (err) {
      console.log(err, r);
    }
  });

  writeFileSync(file2, JSON.stringify(next));
}

// @ts-ignore
function getBackupReceipts() {
  const dest = resolve(baseDest, 'bills/YPnGBCLDB235PjUeoKV4/receipts');

  const receipts = readdirSync(dest)
    .map(name => join(dest, name))
    .filter(source => lstatSync(source).isDirectory())
    .map(source => {
      const dir = basename(source);
      return parseFile(resolve(dest, dir, `${dir}.json`));
    });

  const result = [];

  for (let i = 84; i < 85; i++) {
    // @ts-ignore
    const splits = [
      {
        value: receipts[i].splits['0'].amount.value,
        currency: receipts[i].currency.value,
        // @ts-ignore
        userId: userEmails[receipts[i].splits['0'].uid.value].id,
      },
      {
        value: receipts[i].splits['1'].amount.value,
        currency: receipts[i].currency.value,
        // @ts-ignore
        userId: userEmails[receipts[i].splits['1'].uid.value].id,
      },
    ];

    const receipt = {
      category: receipts[i].category.value,
      // city: receipt.city.value,
      comment: receipts[i].comment.value,
      company: receipts[i].company.value,
      // country: receipt.country.value,
      createdAt: receipts[i].createdAt.value,
      // createdBy: receipt.createdBy.value,
      currency: receipts[i].currency.value,
      // @ts-ignore
      paidById: userEmails[receipts[i].paidBy.value].id,
      // @ts-ignore
      creatorId: userEmails[receipts[i].createdBy.value].id,
      paidAt: receipts[i].paidDate.value,
      total: receipts[i].total.value,
    };

    result.push({
      receipt,
      splits,
    });
  }

  return result;

  // @ts-ignore
  // return receipts.map(r => {
  //   if (r.paidBy && r.paidBy.value) {
  //   }
  //   return undefined;
  //   // if (!r.paidBy.value) {
  //   //   console.log('not paid by', r);
  //   // }
  //   // console.log(r);
  // });
}

// @ts-ignore
function parseFile(path: string) {
  return JSON.parse(readFileSync(path, { encoding: 'utf-8' }));
}

// @ts-ignore
async function asyncForEach(array: Array<any>, callback: Function) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

// @ts-ignore
async function initReceipt() {
  await createTypeormConn();

  // @ts-ignore
  const billId = 'de9b0e80-6e21-4b40-bdbf-3463e910c7fe';
  // const user1 = '0fad1cd5-71af-4fd8-bd05-3b6b4aad9a57';
  // const user2 = 'db1e4f56-b589-4e76-b795-c0a45071f60a';

  // @ts-ignore
  // const receipts = getBackupReceipts();
  const file2 = parseFile(resolve(__dirname, 'receipts2.json'));
  // console.log(Array.isArray(receipts));
  // console.log(file2[0]);

  asyncForEach(file2, async (item: any) => {
    const res = await getConnection()
      .getRepository(Receipt)
      .save({
        category: item.category,
        city: item.city,
        comment: item.comment,
        country: item.country,
        company: item.company,
        createdAt: item.createdAt,
        creatorId: item.creatorId,
        currency: item.currency,
        paidById: item.paidById,
        paidAt: item.paidAt,
        total: item.total,
        billId,
      });

    await Promise.all([
      updateBillTimestamp({ billId }),
      ...item.splits.map((split: any) => {
        return getConnection()
          .getRepository(ReceiptSplit)
          .save({
            ...split,
            receiptId: res.id,
          });
      }),
    ]);
  });
}

initReceipt();
// initUsers();

// receiptsToFile();
