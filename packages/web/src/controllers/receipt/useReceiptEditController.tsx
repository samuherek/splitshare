import { UserSplit } from '../../graphql/types';
import useAllowSubmitCheck from '../../hooks/useAllowSubmitCheck';
import { getSplitsFromUserSplits } from '../../libs/splits';
import useDatePickerController from '../date/useDatePickerController';
import useReceiptCommentController from './useReceiptCommentController';
import useReceiptPayerController from './useReceiptPayerController';
import useReceiptSplitsController from './useReceiptSplitsController2';
import useReceiptTitleController from './useReceiptTitleController';
import useReceiptTotalController from './useReceiptTotalController';

type Options = {
  title: string;
  comment?: string;
  paidAt: Date | string;
  paidById: string;
  total: number;
  splits: UserSplit[];
};

function useReceiptEditController({
  title,
  comment,
  paidAt,
  paidById,
  total,
  splits,
}: Options) {
  const titleCtrl = useReceiptTitleController({ title });
  const commentCtrl = useReceiptCommentController({ comment });
  const paidAtCtrl = useDatePickerController({ date: paidAt });
  const paidByCtrl = useReceiptPayerController({ id: paidById });
  const totalCtrl = useReceiptTotalController({ total });

  const splitsCtrl = useReceiptSplitsController({
    total: totalCtrl.total.parsedValue,
    splits: getSplitsFromUserSplits(splits),
  });

  const allowSubmit = useAllowSubmitCheck(
    {
      title: titleCtrl.title,
      comment: commentCtrl.comment,
      paidAt: paidAtCtrl.date,
      paidById: paidByCtrl.id,
      total: totalCtrl.total,
      splits: splitsCtrl,
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

export default useReceiptEditController;
