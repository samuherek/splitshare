import { RouteComponentProps } from '@reach/router';
import { ExecutionResult } from 'graphql';
import React from 'react';
import styled from 'styled-components';
import tryToCatch from 'try-to-catch';
import ErrorMessage from '../../components/ErrorMessage';
import useBillNameController from '../../controllers/bill/useBillNameController';
import useCurrencyController from '../../controllers/currency/useCurrencyController';
import {
  MutationCreateBillResponse,
  useMutationCreateBill,
} from '../../graphql/bill/mutationCreateBill';
import useAllowSubmit from '../../hooks/useAllowSubmit';
import currencies from '../../libs/currencies.json';
import TextField from '../../ui/components/TextField/TextField';
import Typography from '../../ui/components/Typography/Typography';
import Button from '../../ui/theme/Button';
import Fieldset from '../../ui/theme/Fieldset';

const WrapStyled = styled.div`
  padding: 92px 0 48px;
`;

function FirstBill({ navigate }: RouteComponentProps) {
  const { name } = useBillNameController();
  const { currency } = useCurrencyController();

  const [createBill, { loading, error }] = useMutationCreateBill({
    name: name.value,
    currency: currency.value,
  });

  const allowSubmit = useAllowSubmit({ name }, { name: name.value }, ['name']);

  async function handleSubmit(ev: any) {
    ev.preventDefault();

    if (allowSubmit) {
      // TODO: Lear now to create tryToCatch module
      const [err, res]: [
        Error,
        ExecutionResult<MutationCreateBillResponse>
      ] = await tryToCatch(createBill);

      if (!err && res.data?.createBill) {
        navigate && navigate(`${res.data.createBill.id}`);
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
          Setup your first bill
        </Typography>
        <form onSubmit={handleSubmit}>
          <Fieldset
            disabled={loading}
            style={{
              marginBottom: 48,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <TextField
              name="name"
              required
              value={name.value}
              onChange={name.onChange}
              placeholder="Joh and Jonah bill"
              label="Name"
            />
            <span>Currency</span>
            <select
              value={currency.value}
              onChange={(ev: any) => currency.onChange(ev.target.value)}
            >
              {Object.keys(currencies).map((key: any) => {
                // @ts-ignore
                const c = currencies[key];
                return (
                  <option key={c.code} value={c.code}>
                    {c.name}
                  </option>
                );
              })}
            </select>
            <Button
              type="submit"
              style={{ marginTop: 48 }}
              disabled={!allowSubmit}
            >
              Start bill
            </Button>
          </Fieldset>
        </form>
      </WrapStyled>
      {error ? <ErrorMessage error={error} /> : null}
    </>
  );
}

export default FirstBill;
