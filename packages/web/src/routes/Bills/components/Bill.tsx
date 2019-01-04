import * as React from 'react';
import { distanceInWordsStrict } from 'date-fns';
import { Bill } from 'src/types';
import { Link } from '@reach/router';

interface IProps {
  bill: Bill;
}

const Bill: React.FC<IProps> = ({ bill }) => (
  <div>
    <Link to={bill.id}>{bill.name}</Link>
    --
    <span>
      {distanceInWordsStrict(new Date(), Date.parse(bill.createdAt), {
        addSuffix: true,
      })}
    </span>
  </div>
);

export default Bill;
