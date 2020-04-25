// @ts-ignore
import * as tryCatch from 'try-catch';
import * as uuidValid from 'uuid-validate';
import { MyContext } from '../../types';
import { maybe } from '../../utils/object';
import { ACTION_TYPE, ENTITY_TYPE } from '../notification/config/entity-types';
import { CreateReceiptInput } from '../receipt/types.d';
import { ImportBillArgs } from './types.d';

type ImportDataMap = {
  existingUserIds: { [key: string]: any };
  newEmails: { [key: string]: any };
  existingBillIds: { [key: string]: any };
  newBillNames: { [key: string]: any };
  receipts: CreateReceiptInput[];
};

type RawImportData = {
  comment?: string | null;
  category?: string | null;
  title?: string | null;
  total?: number | null;
  currency?: string | null;
  settlement?: boolean | null;
  paid_by_id?: string | null;
  created_by_id?: string | null;
  bill_id?: string | null;
  paid_at?: string | null;
  splits?: { userId?: string | null; value?: number | null }[] | null;
};

const requiredFields = [
  'bill_id',
  'currency',
  'paid_at',
  'paid_by_id',
  'total',
  'splits',
];

export default {
  Mutation: {
    // TODO: at the moment I try to support only one bill import.
    // But it should probably be possible to support import of multiple bills.
    // It needs to have a lot of tests to make sure it works.
    // For the time being let's make it as simple as possible.
    importBill: async (
      _: any,
      { input }: ImportBillArgs,
      { models, user }: MyContext
    ) => {
      const [err, data]: [
        Error | undefined,
        RawImportData[] | undefined
      ] = tryCatch(JSON.parse, input.data);

      if (err) {
        throw err;
      }

      // We are only supporting an array of receipts with all the
      // data already in the receipts references right now.
      if (!Array.isArray(data)) {
        throw new Error('We only support import of an array');
      }

      // Let's map over the receipts and collect the user and bill
      // information to create non existing entities in our database
      // before we start the import
      const dataMap = data.reduce<ImportDataMap>(
        (acc, next) => {
          if (
            // @ts-ignore
            requiredFields.some(
              (f) => next[f] === undefined || next[f] === null
            )
          ) {
            throw new Error('One of the receipts is missing required fields');
          }

          if (next.bill_id) {
            if (uuidValid(next.bill_id)) {
              acc.existingBillIds[next.bill_id] = true;
            } else {
              acc.newBillNames[next.bill_id] = true;
            }
          }

          if (next.paid_by_id) {
            if (uuidValid(next.paid_by_id)) {
              acc.existingUserIds[next.paid_by_id] = true;
            } else {
              acc.newEmails[next.paid_by_id] = true;
            }
          }

          if (next.created_by_id) {
            if (uuidValid(next.created_by_id)) {
              acc.existingUserIds[next.created_by_id] = true;
            } else {
              acc.newEmails[next.created_by_id] = true;
            }
          }

          if (next.splits) {
            if (!Array.isArray(next.splits)) {
              throw new Error('one of the receipts did not provide splits');
            }
            next.splits.forEach((s) => {
              if (s.userId) {
                if (uuidValid(s.userId)) {
                  acc.existingUserIds[s.userId] = true;
                } else {
                  acc.newEmails[s.userId] = true;
                }
              }
            });
          }

          // Let's put the receipt in the shape of a create receipt input
          // It will make it easier to pass the object to the entity model.
          const nextReceipt: CreateReceiptInput = {
            billId: next.bill_id as string,
            title: next.title as string,
            paidAt: new Date(next.paid_at as string),
            paidById: next.paid_by_id as string,
            total: next.total as number,
            currency: next.currency as string,
            splits:
              next.splits?.map((s) => ({
                userId: s.userId as string,
                value: s.value as number,
              })) ?? [],
            ...maybe('comment', next.comment),
            ...maybe('category', next.category),
          };

          acc.receipts.push(nextReceipt);

          return acc;
        },
        {
          existingUserIds: {},
          newEmails: {},
          existingBillIds: {},
          newBillNames: {},
          receipts: [],
        }
      );

      // Read the following comment to see why we want to see the lengths
      const existingBillsLength = Object.keys(dataMap.existingBillIds).length;
      const newBillsLength = Object.keys(dataMap.newBillNames).length;

      // We are making sure here only exiting bill or a new bill is allowed
      // we are preventing the code to continue unless we only have one bill
      // found in both variables at the same time.
      if (
        existingBillsLength > 1 ||
        newBillsLength > 1 ||
        (existingBillsLength > 0 && newBillsLength && 0)
      ) {
        throw new Error('we only support one bill import at a time');
      }

      const existingUserIds = Object.keys(dataMap.existingUserIds);

      //We check if the existing users we specified really exist in our db
      // before we start the import
      if (existingUserIds.length > 0) {
        const users = await models.User.getUsersByIds(existingUserIds);
        if (existingUserIds.length !== users.length) {
          throw new Error(
            'One of the users provided does not exist in our system'
          );
        }
      }

      const existingBillId =
        existingBillsLength > 0
          ? Object.keys(dataMap.existingBillIds)[0]
          : null;
      const newBillName =
        newBillsLength > 0 ? Object.keys(dataMap.newBillNames)[0] : null;
      // TODO: this probably goes away into email service
      // For reference for emails
      // let targetBill: Bill | null = null;

      // We check if the exiting bill exist in our db before we proceed.
      if (existingBillId) {
        const bill = await models.Bill.getById(existingBillId, user.id);
        if (!bill) {
          throw new Error('The selected bill does not exist in our system');
        }
        // TODO: this probably goes away into email service
        // For reference for emails
        // targetBill = bill;
      }

      // We build a simple "oldId" => "newId" map for easier access.
      // It will be used to build the receipt entity with correct bill
      // references for our DB.
      const billKeyIdMap: { [oldId: string]: string } = {};

      // Let's store the DB bill id reference in the map;
      if (existingBillId) {
        billKeyIdMap[existingBillId] = existingBillId;
      } else if (newBillName) {
        // TODO: figure out the currency here.
        // Should be coming dynamically from the user choice.
        // This can be done later
        const newBill = await models.Bill.createOne(
          { name: newBillName, currency: 'EUR' },
          user.id
        );
        // TODO: this probably goes away into email service
        // For reference for emails
        // targetBill = newBill;
        billKeyIdMap[newBillName] = newBill.id;
      }

      const importEmails = Object.keys(dataMap.newEmails);
      // We build a simple "oldId" => "newId" map for easier access
      // It will be used to build the receipt entity with correct
      // user references for our DB.
      const userKeyIdMap = {
        ...existingUserIds.reduce<{ [key: string]: string }>((acc, nextKey) => {
          acc[nextKey] = nextKey;
          return acc;
        }, {}),
      };

      if (importEmails.length > 0) {
        const dbEmailUsers = await models.User.getByEmails(importEmails);
        dbEmailUsers.forEach((user) => {
          userKeyIdMap[user.email] = user.id;
        });

        const newUsers = await Promise.all(
          importEmails
            .filter((email) => !dbEmailUsers.some((dbe) => dbe.email === email))
            .map((email) => {
              return models.User.createOne({ email });
            })
        );

        newUsers.forEach((user) => {
          userKeyIdMap[user.email] = user.id;
        });
      }

      // Let's build the "BillUser" relationship in our database
      // and trigger a notification/email update for the user.
      // Before we import the receipts. We can always import receipts
      // into existing bill with exiting users later.import { Bill } from '../../entity/Bill';

      const userIds = Object.values(userKeyIdMap);
      // We know there is exactly one bill in the map. Otherwise, there
      // should have been an error
      const billId = Object.values(billKeyIdMap)[0];
      const billHasTheseUsers = await models.BillUser.getBillUsersById(
        billId,
        userIds
      );

      await Promise.all(
        userIds
          .filter((uId) => !billHasTheseUsers.some((u) => u.userId === uId))
          .map(async (uId) => {
            const billUser = await models.BillUser.createOne({
              billId,
              userId: uId,
              addedById: user.id,
            });

            if (!billUser) {
              throw new Error(
                'Something went wrong with the bill_user creation'
              );
            }
            // TODO: this should be extracted into a messaging system ?
            await models.Notification.createOne({
              actorId: user.id,
              entityTypeId: ENTITY_TYPE.BILL_INVITE,
              actionTypeId: ACTION_TYPE.CREATED,
              entityId: billId,
              recipientIds: [billUser.userId],
            });

            // TODO: Sending emails should be moved outside of this because it can be done later
            // TODO: this should be extracted into a messaging system ?
            if (process.env.ACTIVATE_EMAILS === 'true') {
              // TODO: figure how to get the email of the user without
              // querying too much???
              // models.Email.sendBillInvite({
              //   toEmail: xxx.email,
              //   billName: targetBill?.name ?? '',
              //   fromName: `${user.firstName} ${user.lastName}`,
              // });
            }
          })
      );

      // Map receipts with the correct user nad bill references
      const newReceipts = dataMap.receipts.map((r) => ({
        ...r,
        billId: billKeyIdMap[r.billId],
        paidById: userKeyIdMap[r.paidById],
        splits: r.splits.map((s) => ({
          ...s,
          userId: userKeyIdMap[s.userId],
        })),
      }));

      // Load everything to the database :)
      await Promise.all(
        newReceipts.map((r) => {
          return models.Receipt.createOne(r, user.id);
        })
      );

      return true;
    },
  },
};
