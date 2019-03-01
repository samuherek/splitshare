import { AvatarUser, Button, ButtonBase, styled } from '@splitshare/ui';
import * as React from 'react';
import { useMutation, useQuery } from 'react-apollo-hooks';
import { RECEIPT_QUERY } from '../../graphql/ReceiptQuery';
import { REMOVE_RECEIPT_MUTATION } from '../../graphql/RemoveReceiptMutation';
import {
  ReceiptQueryArgs,
  ReceiptSplit,
  RemoveReceiptMutationArgs,
} from '../../types';
import getCurrencySymbol from '../../utils/getCurrencySymbol';

interface IProps {
  onCancel: () => void;
  receiptId: string | null;
}

const WrapStyled = styled.div`
  position: absolute;
  top: 25px;
  left: 0;
  background: #f9faff;
  bottom: 0;
  right: 0;
`;

const ReceiptOverlay = ({ receiptId, onCancel }: IProps) => {
  if (!receiptId) {
    return null;
  }

  const { data } = useQuery<any, ReceiptQueryArgs>(RECEIPT_QUERY, {
    notifyOnNetworkStatusChange: true,
    variables: { id: receiptId },
  });

  const removeReceiptMutation = useMutation<any, RemoveReceiptMutationArgs>(
    REMOVE_RECEIPT_MUTATION,
    {
      variables: {
        id: receiptId,
      },
    }
  );

  async function removeReceipt() {
    try {
      const res = await removeReceiptMutation();
      console.log(res);
      if (res && res.data.removeReceipt) {
        onCancel();
      }
    } catch (err) {
      throw new Error(err);
    }
  }

  return (
    <WrapStyled>
      {data && data.receipt ? (
        <div>
          <h3>{data.receipt.company}</h3>
          <Button onClick={removeReceipt}>Remove</Button>
          <p>{new Date(data.receipt.createdAt).toDateString()}</p>
          <span>{data.receipt.paidBy.id}</span>
          {data.receipt.splits.map((s: ReceiptSplit) => (
            <div
              key={s.id}
              style={{
                alignItems: 'center',
                display: 'flex',
                margin: '15px 0',
              }}
            >
              <AvatarUser name={s.user.displayName || s.user.email} />
              <span style={{ margin: '0 8px' }}>
                {s.user.displayName || s.user.email}
              </span>
              <span>{s.user.id}</span>
              <span>
                {s.value}
                {getCurrencySymbol(s.currency)}
              </span>
            </div>
          ))}
          <ButtonBase onClick={onCancel}>Cancel</ButtonBase>
        </div>
      ) : null}
    </WrapStyled>
  );
};

export default ReceiptOverlay;
