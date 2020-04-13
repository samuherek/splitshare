import { RouteComponentProps } from '@reach/router';
import { ExecutionResult } from 'graphql';
import React from 'react';
import styled from 'styled-components';
import tryToCatch from 'try-to-catch';
import AvatarUser from '../../components/AvatarUser';
import ErrorMessage from '../../components/ErrorMessage';
import { useQueryBill } from '../../graphql/bill/queryBill';
import {
  MutationCreateBillInviteResponse,
  useMutationCreateBillInvite,
} from '../../graphql/invite/mutationCreateBillInvite';
import useAllowSubmit from '../../hooks/useAllowSubmit';
import TextField from '../../ui/components/TextField';
import Typography from '../../ui/components/Typography';
import Button from '../../ui/theme/Button';
import Fieldset from '../../ui/theme/Fieldset';
import { firstLetter } from '../../utils/string';

type Props = RouteComponentProps & {
  id?: string;
};

const WrapStyled = styled.div`
  padding: 92px 0 48px;
`;

function FirstBillInvite({ id, ...rest }: Props) {
  const [emailList, setEmailList] = React.useState<string[]>([]);
  const [email, setEmail] = React.useState('');

  const { data } = useQueryBill({ id: id || '' });
  const [createInvite, { loading, error }] = useMutationCreateBillInvite({
    billId: id || '',
    email,
  });

  const bill = data?.bill ?? null;

  const allowSubmit = useAllowSubmit({ email: '' }, { email }, ['email']);

  async function handleSubmit(ev: any) {
    ev.preventDefault();

    if (allowSubmit) {
      const [err, res]: [
        Error,
        ExecutionResult<MutationCreateBillInviteResponse>
      ] = await tryToCatch(createInvite);

      if (!err && res.data?.createBillInvite) {
        setEmailList([...emailList, email]);
        setEmail('');
      }
    }
  }

  if (!bill) {
    return <span>missing bill</span>;
  }

  return (
    <>
      <WrapStyled>
        <Typography component="h2">Invite bill participants</Typography>
        <form onSubmit={handleSubmit}>
          <Fieldset disabled={loading}>
            <TextField
              name="email"
              value={email}
              onChange={(ev: any) => {
                setEmail(ev.target.value);
              }}
            />
            <Button type="submit" disabled={!allowSubmit}>
              Invite
            </Button>
          </Fieldset>
        </form>
        {emailList.map(e => (
          <div key={e}>
            <AvatarUser email={e} fallback={firstLetter(e)} />
            <span>{e}</span>
            <span>Email sent</span>
          </div>
        ))}
      </WrapStyled>
      {error ? <ErrorMessage error={error} /> : null}
    </>
  );
}

export default FirstBillInvite;
