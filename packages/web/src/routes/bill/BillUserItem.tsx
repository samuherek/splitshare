import React from 'react';
import styled from 'styled-components';
import AvatarUser from '../../components/AvatarUser';
import SvgTrashRegular from '../../components/icons/TrashRegular';
import { BillUser } from '../../graphql/types';
import { useQueryMe } from '../../graphql/user/queryMe';
import ButtonIcon from '../../ui/ButtonIcon';
import { initials } from '../../utils/user';

type Props = {
  billUser: BillUser;
  onDelete: (billUser: BillUser) => void;
};

const UserWrapStyled = styled.div`
  display: flex;
  align-items: center;
  padding: 4px 8px;
`;

function BillUserItem({ billUser, onDelete }: Props) {
  const { data } = useQueryMe();

  return (
    <>
      <UserWrapStyled
        style={{ opacity: billUser.state === 'PENDING' ? 0.5 : 1 }}
      >
        <AvatarUser
          email={billUser.email}
          fallback={initials(billUser)}
          style={{ marginRight: 8 }}
        />
        <div key={billUser.id}>{billUser.email}</div>
        {data?.me?.id !== billUser?.id ? (
          <ButtonIcon onClick={() => onDelete(billUser)}>
            <SvgTrashRegular />
          </ButtonIcon>
        ) : null}
      </UserWrapStyled>
    </>
  );
}

export default BillUserItem;
