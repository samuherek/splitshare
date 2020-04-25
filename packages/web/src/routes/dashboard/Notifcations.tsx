import React from 'react';
import styled from 'styled-components';
import tryToCatch from 'try-to-catch';
import ErrorMessage from '../../components/ErrorMessage';
import { useMutationClearNotifications } from '../../graphql/notification/mutationClearNotifications';
import { useQueryNotifications } from '../../graphql/notification/queryNotifications';
import { useQueryNotificationsCount } from '../../graphql/notification/queryNotificationsCount';
import { BillInvite, ClearType, NotificationType } from '../../graphql/types';
import ButtonIcon from '../../ui/components/ButtonIcon';
import SvgBell from '../../ui/components/icons/Bell';
import Popover from '../../ui/components/Popover/Popover';
import { mergeQueryState } from '../../utils/graphql';
import BillInviteNotification from './notifications/BillInviteNotification';

const ButtonIconStyled = styled(ButtonIcon)`
  position: relative;
`;

const CountBadgeStyled = styled.span`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  background: red;
  color: white;
  border-radius: 50%;
  width: 14px;
  height: 14px;
  font-size: 11px;
  top: 0;
  right: 0;
`;

const WrapStyled = styled.div`
  width: 300px;
  height: 200px;
  overflow-y: auto;
`;

function Notifications() {
  const clearingSuccessfulRef = React.useRef(false);
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const unreadCount = useQueryNotificationsCount({ isSeen: false });

  const [clearUnseenCount, mutState] = useMutationClearNotifications({
    type: ClearType.Seen,
  });

  const { data, ...notificationsState } = useQueryNotifications({
    queryOpts: {
      skip: !Boolean(anchorEl),
    },
  });

  function handleClick(ev: any) {
    setAnchorEl(ev.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  React.useEffect(() => {
    async function run() {
      if (
        anchorEl &&
        !clearingSuccessfulRef.current &&
        (unreadCount.data?.notificationsCount ?? 0) > 0
      ) {
        const [err, res] = await tryToCatch(clearUnseenCount);
        if (!err && res) {
          clearingSuccessfulRef.current = true;
        }
      }
    }

    run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [anchorEl]);

  const { error } = mergeQueryState(unreadCount, notificationsState, mutState);

  return (
    <>
      <ButtonIconStyled onClick={handleClick}>
        {(unreadCount.data?.notificationsCount ?? 0) > 0 ? (
          <CountBadgeStyled>
            {unreadCount.data?.notificationsCount}
          </CountBadgeStyled>
        ) : null}
        <SvgBell />
      </ButtonIconStyled>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
      >
        <WrapStyled>
          {notificationsState.loading ? (
            <div>loading...</div>
          ) : data ? (
            data.notifications.edges.map(({ node }) => {
              if (!node.entity) {
                return null;
              }
              if (node.entityType === NotificationType.BillInvite) {
                const billInvite = node.entity as BillInvite;
                return (
                  <BillInviteNotification
                    key={node.id}
                    id={node.id}
                    invite={billInvite}
                    createdAt={node.createdAt}
                    actor={node.actor}
                    action={node.action}
                  />
                );
              }
              return null;
            })
          ) : null}
        </WrapStyled>
      </Popover>
      {error ? <ErrorMessage error={error} /> : null}
    </>
  );
}

export default Notifications;
