import { gql, MutationHookOptions, useMutation } from '@apollo/client';
import {
  BillInvite,
  InviteState,
  MutationUpdateBillInviteArgs,
} from '../types';

export type MutationUpdateBillInviteResponse = {
  updateBillInvite: BillInvite;
};

const MUTATION_UPDATE_BILL_INVITE = gql`
  mutation MutationUpdateBillInvite($input: UpdateBillInviteInput!) {
    updateBillInvite(input: $input) {
      id
      state
    }
  }
`;

type Options = {
  billId: string;
  state: InviteState;
  mutationOpts?: MutationHookOptions;
};

function useMutationUpdateBillInvite({ billId, state, mutationOpts }: Options) {
  const mutation = useMutation<
    MutationUpdateBillInviteResponse,
    MutationUpdateBillInviteArgs
  >(MUTATION_UPDATE_BILL_INVITE, {
    ...mutationOpts,
    variables: {
      input: {
        billId,
        state,
      },
    },
    // TODO: we need to refetch all the bills so we can see
    // the ones where we accepted the invitation or rejected it
    // refetchQueries: [{
    //   query:
    // }]
  });

  return mutation;
}

export { MUTATION_UPDATE_BILL_INVITE, useMutationUpdateBillInvite };
