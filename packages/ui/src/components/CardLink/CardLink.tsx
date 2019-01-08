import * as React from 'react';
import styled from '../../styles/styled-components';
import { Link } from '@reach/router';

interface IProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  component?: React.ReactNode;
  to: string;
}

const WrapStyled: any = styled.div`
  text-decoration: none;
  background: white;
  border-radius: 16px;
  padding: 25px;
  display: inline-flex;
  flex-direction: column;
`;

export const CardLink: React.FC<IProps> = ({
  children,
  style,
  to,
  ...props
}) => (
  <WrapStyled as={Link} to={to} style={style} {...props}>
    {children}
  </WrapStyled>
);
