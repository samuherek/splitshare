import * as React from 'react';
import { useQuery } from 'react-apollo-hooks';
import { BILL_QUERY } from '../../graphql/BillQuery';
import { styled, DropdownEmoji, ButtonBase, AvatarUser } from '@splitshare/ui';
import UpdateBillMutationContainer from '../../graphql/UpdateBillMutation';
import RemoveBillMutationContainer from '../../graphql/RejectBillInviteMutation';
import { NavigateFn } from '@reach/router';
import { User, BillInvite } from '../../types';

interface IProps {
  billId: string;
  navigate: NavigateFn | undefined;
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

const BillInfo = ({ billId, navigate }: IProps) => {
  const { data, error } = useQuery(BILL_QUERY, { variables: { id: billId } });
  if (error) {
    return <div>{`Error! ${error.message}`}</div>;
  }

  if (!data.bill) {
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
                  {data.bill.icon ? (
                    data.bill.icon
                  ) : (
                    <span
                      style={{
                        opacity: 0.25,
                        textAlign: 'center',
                        textTransform: 'uppercase',
                      }}
                    >
                      {data.bill.name.substr(0, 1)}
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
      <h2 style={{ fontSize: 28 }}>{data.bill.name}</h2>
      <AvatarWrapStyled>
        {data.bill.users.map((user: User) => {
          return (
            <div
              key={user.id}
              style={{
                alignItems: 'center',
                display: 'flex',
                marginBottom: 15,
              }}
            >
              <AvatarUser name={user.displayName || user.email} />
              <span style={{ marginLeft: 10 }}>
                {user.displayName || user.email}
              </span>
            </div>
          );
        })}
        {data.bill.invites &&
          data.bill.invites.map((invite: BillInvite) => {
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
    </BillInfoStyled>
  );
};

export default BillInfo;
