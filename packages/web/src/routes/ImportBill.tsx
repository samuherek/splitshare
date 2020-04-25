import { RouteComponentProps } from '@reach/router';
import React from 'react';
import styled from 'styled-components';
import tryToCatch from 'try-to-catch';
import ErrorMessage from '../components/ErrorMessage';
import { useMutationImportBill } from '../graphql/bill/mutationImportBill';
import { Bill, User } from '../graphql/types';
import InputFile from '../ui/components/InputFile';
import Button from '../ui/theme/Button';
import BillAssignment, { EmptyBill } from './importBill/BillAssignment';
import UserAssignment, { EmptyUser } from './importBill/UserAssignment';

const WrapStyled = styled.div``;

function parseJSONData(string: string) {
  let data: Object[];
  try {
    data = JSON.parse(string);
  } catch (err) {
    console.log(err);
    return null;
  }

  console.time('calc');
  // We are assuming the files is always an array of objects
  const collection = data.reduce<{
    head: { [key: string]: any };
    users: { [key: string]: null };
    bill: { [key: string]: null };
  }>(
    (acc, next: Object) => {
      Object.entries(next).forEach(([key, value]) => {
        if (!value) {
          return acc;
        }

        if (!acc.head[key]) {
          acc.head[key] = true;
        }

        if (['paid_by_id', 'created_by_id'].some((k) => k === key)) {
          if (!acc.users[value]) {
            acc.users[value] = null;
          }
        }

        if (value === 'splits') {
          value.forEach((v: any) => {
            if (!acc.users[v.userId]) {
              acc.users[v.userId] = null;
            }
          });
        }

        if (key === 'bill_id' && !acc.bill[value]) {
          acc.bill[value] = null;
        }
      });
      return acc;
    },
    { head: {}, users: {}, bill: {} }
  );
  console.timeEnd('calc');

  return {
    head: Object.keys(collection.head),
    users: collection.users,
    bill: collection.bill,
    rows: data,
  };
}

function getBillValue(bill: Bill | EmptyBill | null) {
  return bill?.id ? bill.id : bill?.name ? bill.name : null;
}

function getUserValue(user: User | EmptyUser | null) {
  return user?.id ? user.id : user?.email ? user.email : null;
}

const requiredFields = [
  'bill_id',
  'currency',
  'paid_at',
  'paid_by_id',
  'total',
  'splits',
];

function ImportBill(props: RouteComponentProps) {
  const [data, setData] = React.useState<null | {
    head: string[];
    rows: Object[];
  }>(null);
  const [users, setUsers] = React.useState<null | {
    [key: string]: User | EmptyUser | null;
  }>(null);
  const [bills, setBills] = React.useState<null | {
    [key: string]: Bill | EmptyBill | null;
  }>(null);

  const [importBill, mutState] = useMutationImportBill({
    data: '',
  });

  function handleChange(ev: any) {
    console.log('clicking?????');
    const [file]: File[] = Array.from(ev.target.files);

    const fileReader = new FileReader();
    fileReader.onload = (e: any) => {
      const nextData = parseJSONData(e.target.result);
      setData({
        head: nextData?.head ?? [],
        rows: nextData?.rows ?? [],
      });
      setUsers(nextData?.users ?? {});
      setBills(nextData?.bill ?? {});
    };
    fileReader.readAsText(file);
  }

  function handleBillChange(oldId: string, nextBill: Bill | EmptyBill | null) {
    setBills({
      ...bills,
      [oldId]: nextBill,
    });
  }

  function handleUserChange(oldId: string, nextUser: User | EmptyUser | null) {
    setUsers({
      ...users,
      [oldId]: nextUser,
    });
  }

  async function handleUpload() {
    const [err, res] = await tryToCatch(importBill, {
      variables: {
        input: {
          data: JSON.stringify(
            data?.rows.map((d: any) => ({
              ...d,
              bill_id: getBillValue(bills?.[d.bill_id] ?? null),
              created_by_id: getUserValue(users?.[d.created_by_id] ?? null),
              paid_by_id: getUserValue(users?.[d.paid_by_id] ?? null),
              splits: d.splits.map((s: any) => ({
                ...s,
                userId: getUserValue(users?.[s.userId] ?? null),
              })),
            })) ?? []
          ),
        },
      },
    });
    console.log(err, res);
  }

  console.log(data, users, bills);
  // @ts-ignore
  console.log(data?.rows.filter((r) => requiredFields.some((f) => !r[f])));

  return (
    <>
      <WrapStyled>
        <span>import bill</span>
        <InputFile id="file-to-import" onChange={handleChange}>
          Select a file
        </InputFile>
        <a
          style={{ display: 'none' }}
          href="https://developer.mozilla.org/en/docs/Web/API/File"
          target="_blank"
          rel="noreferrer noopener"
        >
          File
        </a>
        <Button onClick={handleUpload}>Upload the file</Button>
        <UserAssignment rawUsers={users} onChange={handleUserChange} />
        <BillAssignment rawBills={bills} onChange={handleBillChange} />
        <table>
          <thead>
            <tr>
              {data?.head.map((key) => (
                <th key={`${key}-head`}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data?.rows.slice(0, 50).map((row: any, i) => (
              <tr key={i}>
                {data?.head.map((key: any) => {
                  if (key === 'splits') {
                    return row[key].map((s: any, i: number) => (
                      <React.Fragment key={`${s.userId}-split-${i}`}>
                        <div>
                          <span>{users?.[s.userId]?.email || s.userId}</span>
                          <span key={`${s.userId}-split-${i}`}>{s.value}</span>
                        </div>
                      </React.Fragment>
                    ));
                  }
                  return (
                    <td key={`${key}-row`}>
                      {key === 'bill_id'
                        ? bills?.[row[key]]?.name ?? row[key]
                        : key === 'paid_by_id' || key === 'created_by_id'
                        ? users?.[row[key]]?.email ?? row[key]
                        : row[key]}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
        {data?.rows.length ?? 0 > 50 ? (
          <div>
            <span>and {data?.rows.length ?? 0 - 50} more</span>
          </div>
        ) : null}
      </WrapStyled>
      {mutState.error ? <ErrorMessage error={mutState.error} /> : null}
    </>
  );
}

export default ImportBill;
