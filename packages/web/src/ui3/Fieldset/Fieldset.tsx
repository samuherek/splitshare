import React from 'react';
import styled from 'styled-components';

type Props = {
  disabled: boolean;
  children?: any;
  style?: any;
};

const FieldsetStyled = styled.fieldset`
  border: none;
`;

function Fieldset({ disabled, ...rest }: Props) {
  return <FieldsetStyled style={{ opacity: disabled ? 0.5 : 1 }} {...rest} />;
}

export default Fieldset;
