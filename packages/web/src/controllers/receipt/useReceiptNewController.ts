import { BillUser } from '../../graphql/types';
import useAllowSubmit from '../../hooks/useAllowSubmit';
import { getSplitsFromBillUsers } from '../../libs/splits';
import useDatePickerController from '../date/useDatePickerController';
import useReceiptCommentController from './useReceiptCommentController';
import useReceiptPayerController from './useReceiptPayerController';
import useReceiptSplitsController from './useReceiptSplitsController';
import useReceiptTitleController from './useReceiptTitleController';
import useReceiptTotalController from './useReceiptTotalController';

type Options = {
  title?: string;
  comment?: string;
  paidAt?: Date | string;
  paidById?: string;
  total?: number;
  users: BillUser[];
};

function useReceiptNewController({
  title,
  comment,
  paidAt,
  paidById,
  total,
  users,
}: Options) {
  const titleCtrl = useReceiptTitleController({ title });
  const commentCtrl = useReceiptCommentController({ comment });
  const paidAtCtrl = useDatePickerController({ date: paidAt });
  const paidByCtrl = useReceiptPayerController({ id: paidById });
  const totalCtrl = useReceiptTotalController({ total });
  const splitsCtrl = useReceiptSplitsController({
    total: totalCtrl.total.parsedValue,
    splits: getSplitsFromBillUsers(users),
  });

  const allowSubmit = useAllowSubmit(
    {
      title: '',
      total: '0.00',
      paidById: null,
      paidAt: null,
    },
    {
      title: titleCtrl.title.value,
      total: totalCtrl.total.value,
      paidById: paidByCtrl.id.value,
      paidAt: paidAtCtrl.date.value,
    },
    ['title', 'total', 'paidById', 'paidAt']
  );

  return {
    paidAt: paidAtCtrl.date,
    title: titleCtrl.title,
    comment: commentCtrl.comment,
    paidBy: paidByCtrl.id,
    total: totalCtrl.total,
    splits: splitsCtrl,
    allowSubmit,
  };
}

export default useReceiptNewController;
