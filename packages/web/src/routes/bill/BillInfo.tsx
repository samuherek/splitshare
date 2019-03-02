import { NavigateFn } from '@reach/router';
import {
  AvatarUser,
  Button,
  ButtonBase,
  DropdownEmoji,
  styled,
} from '@splitshare/ui';
import * as React from 'react';
import { useQuery } from 'react-apollo-hooks';
import { BILL_QUERY } from '../../graphql/BillQuery';
import RemoveBillMutationContainer from '../../graphql/RejectBillInviteMutation';
import UpdateBillMutationContainer from '../../graphql/UpdateBillMutation';
import { BillInvite } from '../../types';
import BillUsers from './billInfo/BillUsers';

interface IProps {
  billId: string;
  navigate: NavigateFn | undefined;
  setInviteOverlay: React.Dispatch<React.SetStateAction<boolean>>;
}

const BillInfoStyled = styled.div``;

const AvatarWrapStyled = styled.div`
  margin-bottom: 25px;
`;

const IconStyled = styled.span<{ isOpen: boolean }>`
  display: block;
  border-radius: 3px;
  font-size: 50px;
  width: 50px;
  height: 50px;
  line-height: 1.1;
  cursor: pointer;
  background: ${({ isOpen }) =>
    isOpen ? 'rgba(55,53,47,0.08)' : 'transparent'};

  &:hover {
    background: rgba(55, 53, 47, 0.08);
  }
`;

const BillInfo = ({ billId, navigate, setInviteOverlay }: IProps) => {
  const billQuery = useQuery(BILL_QUERY, {
    suspend: true,
    variables: { id: billId },
  });

  if (billQuery.error) {
    return <div>{`Error! ${billQuery.error.message}`}</div>;
  }

  if (!billQuery.data.bill) {
    return null;
  }

  return (
    <BillInfoStyled>
      <div>
        <UpdateBillMutationContainer billId={billId}>
          {({ updateBillMutation }) => (
            <DropdownEmoji
              onSelect={value => {
                console.log(value);
                updateBillMutation({
                  variables: { billId, icon: value },
                });
              }}
              render={(toggleDropdown, isOpen) => (
                <IconStyled
                  style={{ fontSize: 50 }}
                  onClick={toggleDropdown}
                  isOpen={isOpen}
                >
                  {billQuery.data.bill.icon ? (
                    billQuery.data.bill.icon
                  ) : (
                    <span
                      style={{
                        opacity: 0.25,
                        textAlign: 'center',
                        textTransform: 'uppercase',
                      }}
                    >
                      {billQuery.data.bill.name.substr(0, 1)}
                    </span>
                  )}
                </IconStyled>
              )}
            />
          )}
        </UpdateBillMutationContainer>
        <RemoveBillMutationContainer id={billId}>
          {({ rejectBillInviteMutation }) => (
            <ButtonBase
              onClick={async () => {
                try {
                  await rejectBillInviteMutation();
                  if (navigate) {
                    navigate('/');
                  }
                } catch (err) {
                  console.log(err);
                }
              }}
            >
              Remove
            </ButtonBase>
          )}
        </RemoveBillMutationContainer>
      </div>
      <h2 style={{ fontSize: 28 }}>{billQuery.data.bill.name}</h2>
      <AvatarWrapStyled>
        <BillUsers
          billId={billQuery.data.bill.id}
          users={billQuery.data.bill.users}
        />
        {billQuery.data.bill.invites &&
          billQuery.data.bill.invites.map((invite: BillInvite) => {
            return (
              <div
                key={invite.id}
                style={{
                  alignItems: 'center',
                  display: 'flex',
                  marginBottom: 15,
                  opacity: 0.35,
                }}
              >
                <AvatarUser name={invite.email} />
                <span style={{ marginLeft: 10 }}>{invite.email}</span>
                <span
                  style={{
                    background: 'rgba(55,53,47,0.18)',
                    borderRadius: 3,
                    display: 'inline-block',
                    fontSize: 11,
                    marginLeft: 10,
                    padding: '3px 6px',
                  }}
                >
                  pending
                </span>
              </div>
            );
          })}
      </AvatarWrapStyled>
      <Button onClick={() => setInviteOverlay(true)}>+ Invite</Button>
    </BillInfoStyled>
  );
};

export default BillInfo;
