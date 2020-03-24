import React from 'react';
import styled from 'styled-components';
import SvgPencilAltRegular from '../../components/icons/PencilAltRegular';
import SvgTrashRegular from '../../components/icons/TrashRegular';
import { useQueryReceipts } from '../../graphql/receipt/queryReceipts';
import { Bill, Receipt } from '../../graphql/types';
import ButtonIcon from '../../ui/ButtonIcon';
import ErrorMessage from '../../ui/ErrorMessage';
import Typography from '../../ui/Typography';
import { getDisplayName } from '../../utils/user';
import AddReceiptDialog from './receipts/AddReceiptDialog';
import DeleteReceiptDialog from './receipts/DeleteReceiptDialog';
import EditReceiptDialog from './receipts/EditReceiptDialog';
import ReceiptDetailsDialog from './receipts/ReceiptDetailsDialog';

type Props = {
  bill: Bill;
};

const RowStyled = styled.div`
  padding: 8px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  box-shadow: 0 2px 6px 2px rgba(100, 100, 100, 0.1);
  justify-content: space-between;
`;

function Receipts({ bill }: Props) {
  const { data, loading, error, refetch } = useQueryReceipts({
    billId: bill.id,
  });

  const [receiptToDelete, setReceiptToDelete] = React.useState<Receipt | null>(
    null
  );
  const [receiptToShow, setReceiptToShow] = React.useState<Receipt | null>(
    null
  );
  const [receiptToEdit, setReceiptToEdit] = React.useState<Receipt | null>(
    null
  );

  return (
    <>
      <Typography variant="h4" component="h4">
        Receipts ({data?.receipts.pageInfo.itemsCount ?? 0})
      </Typography>
      <AddReceiptDialog bill={bill} callback={refetch} />
      {data?.receipts.edges.map(({ node: receipt }) => (
        <RowStyled key={receipt.id}>
          <div
            role="button"
            onClick={() => setReceiptToShow(receipt)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              cursor: 'pointer',
            }}
          >
            <Typography>{receipt.title}</Typography>
            <Typography>paid by {getDisplayName(receipt.paidBy)}</Typography>
          </div>
          <span>{receipt.paidAt}</span>
          <span>
            {receipt.total} {receipt.currency}
          </span>

          <div>
            <ButtonIcon onClick={() => setReceiptToEdit(receipt)}>
              <SvgPencilAltRegular />
            </ButtonIcon>
            <ButtonIcon onClick={() => setReceiptToDelete(receipt)}>
              <SvgTrashRegular />
            </ButtonIcon>
          </div>
        </RowStyled>
      ))}
      <ReceiptDetailsDialog
        receiptId={receiptToShow?.id ?? null}
        callback={() => setReceiptToShow(null)}
      />
      <EditReceiptDialog
        receipt={receiptToEdit}
        callback={() => setReceiptToEdit(null)}
      />
      <DeleteReceiptDialog
        receipt={receiptToDelete}
        billId={bill.id}
        callback={() => setReceiptToDelete(null)}
      />
      {error ? <ErrorMessage error={error} /> : null}
    </>
  );
}

export default Receipts;
