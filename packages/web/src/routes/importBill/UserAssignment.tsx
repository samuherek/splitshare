import React from 'react';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { User } from '../../graphql/types';
import { useQueryMyUsers } from '../../graphql/user/queryMyUsers';
import TextField from '../../ui/components/TextField';

export type EmptyUser = {
  id: null;
  email: string;
};

type Props = {
  rawUsers: null | { [key: string]: User | EmptyUser | null };
  onChange: (oldId: string, nextUser: User | EmptyUser | null) => void;
};

type UserRowProps = {
  oldId: string;
  dbUsers: User[];
  onChange: (oldId: string, nextUser: User | EmptyUser | null) => void;
};

function UserRow({ oldId, onChange, dbUsers }: UserRowProps) {
  const [email, setEmail] = React.useState('');

  function handleChange(oldId: string) {
    return (ev: any) => {
      let nextUser = dbUsers.find((u) => u.id === ev.target.value);
      onChange(oldId, nextUser || null);
    };
  }

  function handleEmailChange(ev: any) {
    ev.preventDefault();
    onChange(oldId, { id: null, email });
  }

  return (
    <div>
      <div>{oldId}</div>
      <select onChange={handleChange(oldId)}>
        <option>---</option>
        {dbUsers.map((user) => (
          <option value={user.id} key={user.id}>
            {user.email}
          </option>
        ))}
      </select>
      <form onSubmit={handleEmailChange}>
        <TextField
          name={`${oldId}-email`}
          value={email}
          placeholder="or add email"
          onChange={(ev: any) => setEmail(ev.target.value)}
        />
      </form>
    </div>
  );
}

function UserAssignment({ rawUsers, onChange }: Props) {
  const { data, error } = useQueryMyUsers({
    queryOpts: { skip: !rawUsers || Object.keys(rawUsers).length === 0 },
  });

  if (!rawUsers) {
    return null;
  }

  return (
    <>
      <div>
        <h4>Users to change</h4>
        {Object.keys(rawUsers ?? {}).map((name, i) => (
          <UserRow
            key={`${name}-user-${i}`}
            onChange={onChange}
            dbUsers={data?.myUsers ?? []}
            oldId={name}
          />
        ))}
      </div>
      {error ? <ErrorMessage error={error} /> : null}
    </>
  );
}

export default UserAssignment;
