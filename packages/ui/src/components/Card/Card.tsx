import * as React from 'react';
import styled from '../../styles/styled-components';

interface IProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  component?: React.ReactNode;
  to?: string;
}

const WrapStyled = styled.div`
  background: white;
  border-radius: 16px;
  padding: 25px;
`;

export const Card: React.FC<IProps> = ({
  children,
  style,
  component,
  ...props
}) => (
  <WrapStyled as={component as any} style={style} {...props}>
    {children}
  </WrapStyled>
);
