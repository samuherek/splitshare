import useAllowSubmit from '../../hooks/useAllowSubmit';
import { djsAnchors } from '../../utils/date';
import useDatePickerController from '../date/useDatePickerController';
import useReceiptCommentController from './useReceiptCommentController';
import useReceiptPayerController from './useReceiptPayerController';
import useReceiptTitleController from './useReceiptTitleController';
import useReceiptTotalController from './useReceiptTotalController';

type Options = {
  title?: string;
  comment?: string;
  paidAt?: Date | string;
  paidById?: string;
  total?: string;
};

function useReceiptNewController({
  title,
  comment,
  paidAt,
  paidById,
  total,
}: Options = {}) {
  const titleCtrl = useReceiptTitleController({ title });
  const commentCtrl = useReceiptCommentController({ comment });
  const paidAtCtrl = useDatePickerController({ date: paidAt });
  const paidByCtrl = useReceiptPayerController({ id: paidById });
  const totalCtrl = useReceiptTotalController({ total });

  const allowSubmit = useAllowSubmit(
    {
      title: '',
      total: '0',
      paidById: null,
      paidAt: djsAnchors.today.toDate(),
    },
    {
      title: titleCtrl.title.value,
      total: totalCtrl.total.value,
      paidById: paidByCtrl.id.value,
      paidAt: paidAtCtrl.date.value,
    },
    ['title', 'total', 'payedById', 'payedAt']
  );

  return {
    paidAt: paidAtCtrl.date,
    title: titleCtrl.title,
    comment: commentCtrl.comment,
    paidBy: paidByCtrl.id,
    total: totalCtrl.total,
    allowSubmit,
  };
}

export default useReceiptNewController;
