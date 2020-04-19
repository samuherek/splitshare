import clsx from 'clsx';
import React from 'react';
import { useRifm } from 'rifm';
import styled from 'styled-components';
import { BillUser, User } from '../../graphql/types';
import ButtonBase from '../../ui/components/ButtonBase';
import TextField from '../../ui/components/TextField';
import Typography from '../../ui/components/Typography';
import { float, formatFloatingPointNumber } from '../../utils/rifm';
import { getDisplayName, initials } from '../../utils/user';
import AvatarUser from '../AvatarUser';

type Props = {
  user: BillUser | User;
  isPayer: boolean;
  onPaidByChange: (nextUserId: string | null) => void;
  className?: string;
  value: string;
  onValueChange: (userId: string, nextValue: string) => void;
};

export const classes = {
  root: 'UserSplit',
  selected: 'selected',
};

const WrapStyled = styled.div`
  .AvatarUser {
    border: 2px solid transparent;
  }

  &.selected {
    .AvatarUser {
      border-color: green;
    }
  }
`;

const PaidBadgeStyled = styled.span`
  font-size: 10px;
  padding: 4px 8px;
  background: green;
  color: white;
  border-radius: 4px;
`;

function UserSplit({
  user,
  isPayer,
  onPaidByChange,
  className,
  value: valueProp,
  onValueChange,
}: Props) {
  const { value, onChange } = useRifm({
    value: valueProp,
    onChange: (str) => onValueChange(user.id, str),
    accept: float,
    format: (str) => formatFloatingPointNumber(str, 2),
  });

  function handlePaidBySelect(ev: React.SyntheticEvent) {
    // To make sure we don't submit form in case it is in a form
    ev.preventDefault();
    onPaidByChange(isPayer ? null : user.id);
  }

  return (
    <WrapStyled
      className={clsx(className, classes.root, {
        [classes.selected]: isPayer,
      })}
    >
      <ButtonBase onClick={handlePaidBySelect}>
        <AvatarUser email={user.email} fallback={initials(user)} />
        <Typography>{getDisplayName(user)}</Typography>
        {isPayer ? <PaidBadgeStyled>Paid</PaidBadgeStyled> : null}
      </ButtonBase>

      <TextField
        name={`${user.id}-split`}
        required={true}
        value={value}
        onChange={onChange}
      />
    </WrapStyled>
  );
}

export default UserSplit;
