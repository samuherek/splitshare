import React from 'react';
import styled from 'styled-components';
import SvgTrashRegular from '../../components/icons/TrashRegular';
import { useQueryReceipts } from '../../graphql/receipt/queryReceipts';
import { Bill, Receipt } from '../../graphql/types';
import ButtonIcon from '../../ui/ButtonIcon';
import ErrorMessage from '../../ui/ErrorMessage';
import Typography from '../../ui/Typography';
import AddReceiptDialog from './receipts/AddReceiptDialog';
import DeleteReceiptDialog from './receipts/DeleteReceiptDialog';

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

  console.log(data, loading, error);

  return (
    <>
      <Typography variant="h4" component="h4">
        Receipts ({data?.receipts.pageInfo.itemsCount ?? 0})
      </Typography>
      <AddReceiptDialog bill={bill} callback={refetch} />
      {data?.receipts.edges.map(({ node }) => (
        <RowStyled key={node.id}>
          <Typography>{node.title}</Typography>
          <span>{node.paidAt}</span>
          <span>
            {node.total} {node.currency}
          </span>

          <ButtonIcon onClick={() => setReceiptToDelete(node)}>
            <SvgTrashRegular />
          </ButtonIcon>
        </RowStyled>
      ))}
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
