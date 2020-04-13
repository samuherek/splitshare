import styled from 'styled-components';

export const LabelStandard = styled.label`
  display: block;
  margin-bottom: 5px;

  &.focused {
  }

  &.disabled {
    pointer-events: none;
  }
`;
