import React from 'react';
import styled from 'styled-components';

type Props = {
  steps: number;
  active: number;
};

const WrapStyled = styled.div`
  display: flex;
  align-items: center;
  padding: 12px;
`;

const DotStyled = styled.div<{ active: boolean }>`
  width: ${({ active }) => (active ? '16px' : '8px')};
  height: 8px;
  border-radius: 8px;
  background: ${({ active }) => (active ? '#818996' : '#eee')};
  margin: 0 4px;
  transition: 0.2s;
`;

function Stepper({ steps, active }: Props) {
  const [dots] = React.useState(new Array(steps).fill(undefined));

  return (
    <WrapStyled>
      {dots.map((_, index) => (
        <DotStyled key={index} active={index + 1 === active} />
      ))}
    </WrapStyled>
  );
}

export default Stepper;
