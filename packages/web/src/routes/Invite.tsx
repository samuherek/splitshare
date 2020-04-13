import { RouteComponentProps } from '@reach/router';
import React from 'react';
import styled from 'styled-components';
import { StringParam, useQueryParams } from 'use-query-params';
import Typography from '../ui/components/Typography';
import Button from '../ui/theme/Button';

const WrapStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 100vh;
`;

function Invite(props: RouteComponentProps) {
  const [query] = useQueryParams({
    bill_name: StringParam,
    from_name: StringParam,
  });

  const corruptData = !query.bill_name || !query.from_name;

  console.log(query);

  return (
    <WrapStyled>
      {corruptData ? (
        <>
          <span
            style={{ marginBottom: 24, maxWidth: 500, textAlign: 'center' }}
          >
            Something went wrong. Please contact support to help you out. Sorry
            for the inconvenience.
          </span>
          <Button to="/">Go to Dashboard</Button>
        </>
      ) : (
        <>
          <Typography component="h2" style={{ marginBottom: 24 }}>
            Invite accepted!
          </Typography>
          <p style={{ marginBottom: 24, maxWidth: 500, textAlign: 'center' }}>
            You have just accepted the invite to{' '}
            <strong>{query.bill_name}</strong>. Click the button bellow to go to
            your dashboard.
          </p>
          <Button to="/">Go to Dashboard</Button>
        </>
      )}
    </WrapStyled>
  );
}

export default Invite;
