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

interface IProps extends ICardLinkProps {
  title: string;
  updatedAt: string;
  users: User[];
  children?: null;
  icon?: string | null;
}

const CardLinStyled = styled(CardLink)`
  color: inherit;

  h4 {
    margin-bottom: 5px;
  }
`;

const MetaStyled = styled.span`
  margin-bottom: 15px;
  opacity: 0.5;
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: bold;
`;

const AvatarsWrapStyled = styled.div`
  display: flex;
  align-items: center;

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
}) => (
  <CardLinStyled to={to}>
    <h4>
      <span>{icon}</span>
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
    </AvatarsWrapStyled>
  </CardLinStyled>
);
