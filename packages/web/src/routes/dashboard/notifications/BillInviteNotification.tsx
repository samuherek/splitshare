import { Link } from '@reach/router';
import React from 'react';
import styled from 'styled-components';
import tryToCatch from 'try-to-catch';
import ErrorMessage from '../../../components/ErrorMessage';
import { useMutationUpdateBillInvite } from '../../../graphql/invite/mutationUpdateBillInvite';
import { useMutationUpdateNotification } from '../../../graphql/notification/mutationUpdateNotification';
import {
  BillInvite,
  InviteState,
  NotificationAction,
  User,
} from '../../../graphql/types';
import { getBillPath } from '../../../paths';
import ButtonBase from '../../../ui/components/ButtonBase';
import { timeAgo } from '../../../utils/date';
import { mergeQueryState } from '../../../utils/graphql';

type Props = {
  id: string;
  invite: BillInvite;
  createdAt: Date;
  actor: User;
  action: NotificationAction;
};

const WrapStyled = styled.div`
  border-bottom: 1px solid #eee;
`;

function BillInviteNotification({
  id,
  invite,
  action,
  actor,
  createdAt,
}: Props) {
  // @ts-ignore
  const ago = timeAgo(createdAt);

  const [updateBillInvite, upMutState] = useMutationUpdateBillInvite({
    billId: invite.bill.id,
    state: InviteState.Accepted,
  });

  const [updateNotification, notMutState] = useMutationUpdateNotification({
    notificationId: id,
    isRead: true,
  });

  async function handleUpdateInvite(state: InviteState) {
    const [err, res] = await tryToCatch(updateBillInvite, { variables: state });
    if (!err && res) {
      await tryToCatch(updateNotification);
    }
  }

  const { loading, error } = mergeQueryState(upMutState, notMutState);

  return (
    <>
      <WrapStyled>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span>{actor.email}</span>
          <span>
            {action === NotificationAction.Created
              ? 'invited you to join'
              : null}
          </span>
          <Link to={getBillPath(invite.bill.name, invite.bill.id)}>
            {invite.bill.name}
          </Link>
        </div>
        <div>
          <span>{ago}</span>
        </div>
        {invite.state === InviteState.Pending ? (
          <>
            <ButtonBase
              disabled={loading}
              onClick={() => handleUpdateInvite(InviteState.Accepted)}
            >
              Accept
            </ButtonBase>
            <ButtonBase
              disabled={loading}
              onClick={() => handleUpdateInvite(InviteState.Rejected)}
            >
              Reject
            </ButtonBase>
          </>
        ) : invite.state === InviteState.Accepted ? (
          <span>Already accepted</span>
        ) : invite.state === InviteState.Rejected ? (
          <span>Already rejected</span>
        ) : null}
      </WrapStyled>
      {error ? <ErrorMessage error={error} /> : null}
    </>
  );
}

export default BillInviteNotification;
