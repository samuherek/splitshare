import { RouteComponentProps } from '@reach/router';
import { ExecutionResult } from 'graphql';
import React from 'react';
import styled from 'styled-components';
import tryToCatch from 'try-to-catch';
import AvatarUser from '../../components/AvatarUser';
import ErrorMessage from '../../components/ErrorMessage';
import useUserNameController from '../../controllers/user/useUserNameController';
import {
  MutationSetupAccountResponse,
  useMutationSetupAccount,
} from '../../graphql/user/mutationSetupAccount';
import { useQueryMe } from '../../graphql/user/queryMe';
import useAllowSubmit from '../../hooks/useAllowSubmit';
import TextField from '../../ui/components/TextField/TextField';
import Typography from '../../ui/components/Typography';
import Button from '../../ui/theme/Button';
import Fieldset from '../../ui/theme/Fieldset';
import { initials } from '../../utils/user';

const WrapStyled = styled.div`
  padding: 92px 0 48px;

  .AvatarUser {
    width: 80px;
    height: 80px;
  }
`;

function FirstProfile({ navigate }: RouteComponentProps) {
  const { data } = useQueryMe();

  const { firstName, lastName } = useUserNameController();

  const nextValues = {
    firstName: firstName.value,
    lastName: lastName.value,
    avatarUrl: undefined,
  };

  const [setupAccount, { loading, error }] = useMutationSetupAccount(
    nextValues
  );

  const allowSubmit = useAllowSubmit(
    { firstName: '', lastName: '', avatarUlr: '' },
    nextValues,
    ['firstName', 'lastName']
  );

  async function handleSubmit(ev: any) {
    ev.preventDefault();

    if (allowSubmit) {
      const [err, res]: [
        Error,
        ExecutionResult<MutationSetupAccountResponse>
      ] = await tryToCatch(setupAccount);

      if (!err && res.data?.setupAccount) {
        navigate && navigate('bill');
      }
    }
  }

  return (
    <>
      <WrapStyled>
        <Typography
          component="h2"
          style={{ textAlign: 'center', marginBottom: 48 }}
        >
          Setup your profile
        </Typography>
        <form onSubmit={handleSubmit}>
          <Fieldset disabled={loading}>
            <div
              style={{
                marginBottom: 48,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <AvatarUser
                email={data?.me?.email}
                fallback={initials(data?.me)}
                style={{ marginBottom: 24 }}
              />

              <TextField
                label="First Name"
                required
                name="firstName"
                value={firstName.value}
                onChange={firstName.onChange}
                placeholder="Joh"
                style={{ marginBottom: 24 }}
              />
              <TextField
                label="Last Name"
                required
                name="lastName"
                value={lastName.value}
                onChange={lastName.onChange}
                placeholder="Doe"
              />
            </div>

            <Button
              type="submit"
              disabled={!allowSubmit}
              style={{ margin: '0 auto', display: 'block' }}
            >
              Save and continue
            </Button>
          </Fieldset>
        </form>
      </WrapStyled>
      {error ? <ErrorMessage error={error} /> : null}
    </>
  );
}

export default FirstProfile;
