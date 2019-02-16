import { styled } from '@splitshare/ui';
import * as React from 'react';

interface IUserDept {
  userId: string;
  owingToId: string;
  sum: number;
}

interface IProps {
  billDepts: IUserDept[];
  userId: string;
  loading: boolean;
}

const ValueStyled = styled.span<{ variant: string }>`
  color: ${({ variant }) => {
    if (variant === 'neutral') {
      return 'currentColor';
    } else if (variant === 'positive') {
      return 'green';
    } else if (variant === 'negative') {
      return 'red';
    } else {
      return 'currentColor';
    }
  }};
`;

const BalanceValue: React.FC<IProps> = ({ billDepts, userId, loading }) => {
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

  return <ValueStyled variant={variant}>{value}</ValueStyled>;
};

export default BalanceValue;
