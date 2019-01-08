import * as React from 'react';
import { distanceInWordsStrict } from 'date-fns';
import { Bill } from 'src/types';
import { AvatarUser, CardLink, styled } from '@splitshare/ui';

interface IProps {
  bill: Bill;
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

const Bill: React.FC<IProps> = ({ bill }) => (
  <CardLinStyled to={bill.id}>
    <h4>{bill.name}</h4>
    <MetaStyled style={{}}>
      {distanceInWordsStrict(new Date(), Date.parse(bill.updatedAt), {
        addSuffix: true,
      })}
    </MetaStyled>
    <AvatarsWrapStyled>
      {bill.users.map(user => (
        <AvatarUser key={user.id} name={user.email} url={user.photoUrl} />
      ))}
    </AvatarsWrapStyled>
  </CardLinStyled>
);

export default Bill;
