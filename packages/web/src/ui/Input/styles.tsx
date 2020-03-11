import styled from 'styled-components';

export const Outlined = styled.div`
  padding: 12px 16px;
  border-radius: 4px;

  border: 1px solid #eee;

  input,
  textarea {
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 0.6px;

    &::-webkit-input-placeholder {
      font-weight: normal;
    }
    &::-moz-placeholder {
      font-weight: normal;
    }
    &:-ms-input-placeholder {
      font-weight: normal;
    }
    &::-ms-input-placeholder {
      font-weight: normal;
    }
  }

  &.focused {
    input,
    textarea {
    }
  }
`;
