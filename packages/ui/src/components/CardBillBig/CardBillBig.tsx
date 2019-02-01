import * as React from 'react';
import styled from '../../styles/styled-components';
import { CardLink, ICardLinkProps } from '../CardLink';
import { distanceInWordsStrict } from 'date-fns';
import { AvatarUser } from '../AvatarUser';

interface User {
  id: string;
  email: string;
  photoUrl?: string | null;
}
interface BillInvite {
  id: string;
  email: string;
  photoUrl?: string | null;
}

interface IProps extends ICardLinkProps {
  title: string;
  updatedAt: string;
  users: User[];
  children?: null;
  icon?: string | null;
  invites?: Partial<BillInvite>[] | null;
}

const CardLinStyled = styled(CardLink)`
  color: inherit;

  h4 {
    margin-bottom: 5px;
  }
`;

const MetaStyled = styled.span`
  margin-bottom: 35jpx;
  opacity: 0.5;
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: bold;
`;

const AvatarsWrapStyled = styled.div`
  display: flex;
  align-items: center;
  margin-top: 25px;

  & > span {
    margin-right: 10px;
  }
`;

export const CardBillBig: React.FC<IProps> = ({
  to,
  title,
  updatedAt,
  users,
  icon,
  invites,
}) => (
  <CardLinStyled to={to}>
    <h4 style={{ display: 'inline-flex', fontSize: 22, alignItems: 'center' }}>
      <span style={{ marginRight: 10, fontSize: 32 }}>{icon}</span>
      {title}
    </h4>
    <MetaStyled style={{}}>
      {distanceInWordsStrict(new Date(), Date.parse(updatedAt), {
        addSuffix: true,
      })}
    </MetaStyled>
    <AvatarsWrapStyled>
      {users.map(user => (
        <AvatarUser key={user.id} name={user.email} url={user.photoUrl} />
      ))}
      {invites && invites.length > 0 ? (
        <div style={{ display: 'flex', position: 'relative', height: 30 }}>
          {invites.map((invite, i) => (
            <AvatarUser
              key={invite.id}
              style={{
                background: '#f7f7f7',
                border: '2px solid white',
                color: 'rgba(55,52,47,0.2)',
                position: 'absolute',
                left: i * 20,
                zIndex: 10 - i,
              }}
              name={invite.email || ''}
            />
          ))}
        </div>
      ) : null}
    </AvatarsWrapStyled>
  </CardLinStyled>
);
