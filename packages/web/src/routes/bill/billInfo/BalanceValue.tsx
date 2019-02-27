import { styled } from '@splitshare/ui';
import * as React from 'react';
import getCurrencySymbol from '../../../utils/getCurrencySymbol';

interface IUserDept {
  userId: string;
  owingToId: string;
  sum: number;
  currency: string;
}

interface IProps {
  billDepts: IUserDept[];
  userId: string;
  loading: boolean;
}

const ValueStyled = styled.span<{ variant: string }>`
  display: inline-block;
  padding: 3px 7px;
  border-radius: 3px;
  font-size: 12px;
  background: ${({ variant }) => {
    if (variant === 'positive') {
      return '#3cde70';
    } else if (variant === 'negative') {
      return '#de3c3c';
    } else {
      return 'currentColor';
    }
  }};
  color: ${({ variant }) => {
    if (variant === 'positive' || variant === 'negative') {
      return 'white';
    } else {
      return 'currentColor';
    }
  }};
`;

const BalanceValue: React.FC<IProps> = ({ billDepts, userId, loading }) => {
  if (billDepts.length === 0) {
    return null;
  }

  if (loading) {
    return <span>...</span>;
  }

  const value = billDepts.reduce(
    (
      prev: number,
      next: { userId: string; owingToId: string; sum: number }
    ) => {
      if (next.userId === userId) {
        return prev - next.sum;
      } else if (next.owingToId === userId) {
        return prev + next.sum;
      }
      return prev;
    },
    0
  );

  const variant = value === 0 ? 'neutral' : value > 0 ? 'positive' : 'negative';

  return (
    <ValueStyled variant={variant}>
      {value.toLocaleString(undefined, {
        maximumFractionDigits: 2,
      })}{' '}
      {getCurrencySymbol(billDepts[0].currency)}
    </ValueStyled>
  );
};

export default BalanceValue;
