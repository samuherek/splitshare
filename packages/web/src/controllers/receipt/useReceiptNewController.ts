import { BillUser } from '../../graphql/types';
import useAllowSubmit from '../../hooks/useAllowSubmit';
import { getSplitsFromBillUsers, SplitsMap } from '../../libs/splits';
import useDatePickerController from '../date/useDatePickerController';
import useReceiptCommentController from './useReceiptCommentController';
import useReceiptPayerController from './useReceiptPayerController';
import useReceiptSplitsController from './useReceiptSplitsController2';
import useReceiptTitleController from './useReceiptTitleController';
import useReceiptTotalController from './useReceiptTotalController';

type Options = {
  title?: string;
  comment?: string;
  paidAt?: Date | string;
  paidById?: string;
  total?: number;
  users: BillUser[];
  splits: SplitsMap;
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

  // React.useEffect(() => {
  //   if (totalRef.current !== totalCtrl.total.parsedValue) {
  //     totalRef.current = totalCtrl.total.parsedValue;
  //     const nextSplits = getEqualDistribution(splitsCtrl.value, totalCtrl.total.parsedValue);
  //     setSplitValues(nextSplits);
  //   }
  // }, [total])
  // In case users are added or removed, reset the splits
  // React.useEffect(() => {
  //   if (users.length !== Object.keys(splitsCtrl.value).length) {
  //     const userSplits = getSplitsFromBillUsers(users);
  //     const nextSplits = getEqualDistribution(
  //       userSplits,
  //       totalCtrl.total.parsedValue
  //     );
  //     splitsCtrl.setSplitValues(nextSplits);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [users]);

  // React.useEffect(() => {

  // }, [titleCtrl.title.value])

  const allowSubmit = useAllowSubmit(
    {
      title: '',
      total: 0,
      paidById: null,
      paidAt: null,
    },
    {
      title: titleCtrl.title.value,
      total: totalCtrl.total.parsedValue,
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
