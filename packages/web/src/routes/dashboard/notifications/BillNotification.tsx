import React from 'react';
import styled from 'styled-components';
import { Bill, NotificationAction, User } from '../../../graphql/types';

type Props = {
  bill: Bill;
  createdAt: Date;
  actor: User;
  action: NotificationAction;
};

const WrapStyled = styled.div``;

function BillNotification({ bill, action, actor, createdAt }: Props) {
  return (
    <WrapStyled>
      <span>{actor.email}</span>
      <span>{action === NotificationAction.Created}</span>
    </WrapStyled>
  );
}

export default BillNotification;
