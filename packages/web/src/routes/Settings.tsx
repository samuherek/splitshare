import { RouteComponentProps } from '@reach/router';
import React from 'react';
import styled from 'styled-components';
import AvatarUser from '../components/AvatarUser';
import ErrorMessage from '../components/ErrorMessage';
import { useQueryMe } from '../graphql/user/queryMe';
import Button from '../ui/theme/Button';
import { initials } from '../utils/user';

const WrapStyled = styled.div``;

function Settings(props: RouteComponentProps) {
  const { data, error } = useQueryMe();

  return (
    <>
      <WrapStyled>
        <Button to="/">Back</Button>
        {data ? (
          <>
            <AvatarUser email={data.me?.email} fallback={initials(data.me)} />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span>
                {data.me?.firstName} {data.me?.lastName}
              </span>
              <span>{data.me?.email}</span>
            </div>
          </>
        ) : null}
      </WrapStyled>
      {error ? <ErrorMessage error={error} /> : null}
    </>
  );
}

export default Settings;
