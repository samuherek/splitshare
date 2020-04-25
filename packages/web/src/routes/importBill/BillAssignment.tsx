import React from 'react';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { useQueryBills } from '../../graphql/bill/queryBills';
import { Bill, BillEdges } from '../../graphql/types';
import TextField from '../../ui/components/TextField';

export type EmptyBill = {
  id: null;
  name: string;
};

type Props = {
  rawBills: { [key: string]: Bill | EmptyBill | null } | null;
  onChange: (oldBillId: string, nextBill: Bill | EmptyBill | null) => void;
};

type BillRowProps = {
  oldId: string;
  onChange: (oldBillId: string, nextBill: Bill | EmptyBill | null) => void;
  dbBills: BillEdges[];
};

function BillRow({ oldId, onChange, dbBills }: BillRowProps) {
  const [name, setName] = React.useState('');

  function handleChange(oldId: string) {
    return (ev: any) => {
      // We want to find the bill in the possible bills.
      // Then we want to assign it as a new bill.
      // We want to pass the entire bill because we
      // don't know how we'll use it in hte UI
      const nextBill = dbBills.find(({ node }) => node.id === ev.target.value);
      onChange(oldId, nextBill?.node ?? null);
    };
  }

  function handleNameChange(ev: any) {
    ev.preventDefault();
    onChange(oldId, { id: null, name });
  }

  return (
    <div>
      <div>{oldId}</div>
      <select onChange={handleChange(oldId)}>
        <option value="null">---</option>
        {dbBills.map(({ node }) => (
          <option value={node.id} key={node.id}>
            {node.name}
          </option>
        ))}
      </select>
      <form onSubmit={handleNameChange}>
        <TextField
          name={`${oldId}-email`}
          value={name}
          placeholder="or new bill name"
          onChange={(ev: any) => setName(ev.target.value)}
        />
      </form>
    </div>
  );
}

function BillAssignment({ rawBills, onChange }: Props) {
  const { data, error } = useQueryBills({
    withUsers: false,
    queryOpts: { skip: !rawBills || Object.keys(rawBills).length === 0 },
  });

  if (!rawBills) {
    return null;
  }

  return (
    <>
      <div>
        <h4>Bills to change</h4>
        {Object.keys(rawBills ?? {}).map((name, i) => (
          <BillRow
            key={`${name}-${i}`}
            dbBills={data?.bills.edges ?? []}
            onChange={onChange}
            oldId={name}
          />
        ))}
      </div>
      {error ? <ErrorMessage error={error} /> : null}
    </>
  );
}

export default BillAssignment;
