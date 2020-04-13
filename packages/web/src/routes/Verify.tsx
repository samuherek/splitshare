import { RouteComponentProps } from '@reach/router';
import React from 'react';
import styled from 'styled-components';
import { PaperPlaneDuotone } from '../components/icons';
import { useQueryMe } from '../graphql/user/queryMe';
import Typography from '../ui/components/Typography';

const WrapStyled = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const HeadStyled = styled.div`
  margin-bottom: 48px;
  text-align: center;
`;

const PictureStyled = styled.div`
  margin-bottom: 48px;

  svg {
    font-size: 48px;
  }
`;

const FooterStyled = styled.div`
  max-width: 600px;
  text-align: center;
`;

function Verify(props: RouteComponentProps) {
  const { data } = useQueryMe();

  return (
    <WrapStyled>
      <HeadStyled>
        <Typography component="h2">Verify your email</Typography>
        <Typography>
          You will need to verify your email to complete registration
        </Typography>
      </HeadStyled>

      <PictureStyled>
        <PaperPlaneDuotone />
      </PictureStyled>

      <FooterStyled>
        <Typography>
          An email has been sent to {data?.me?.email} with a link to verify your
          account. If you have not received the email after a few minutes,
          please check your spam folder.
        </Typography>
      </FooterStyled>
    </WrapStyled>
  );
}

export default Verify;
