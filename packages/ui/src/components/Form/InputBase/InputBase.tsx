// @flow
import * as React from 'react';
import styled from '../../../styles/styled-components';

interface IInputBaseProps {
  autoComplete?: boolean;
  autoFocus?: boolean;
  className?: string;
  component?: any; // TODO: Figure out how to type this -> JSX.Element | string
  defaultValue?: string;
  disabled?: boolean;
  error?: boolean;
  id?: string;
  name?: string;
  onBlur?: (ev: React.SyntheticEvent) => void;
  onFocus?: (ev: React.SyntheticEvent) => void;
  onChange?: (ev: React.SyntheticEvent) => void;
  placeholder?: string;
  readOnly?: boolean;
  required?: boolean;
  rows?: string | number;
  type?: 'text' | 'number' | 'textarea' | 'search' | 'password';
  value?: string | number;
  step?: string;
  onKeyPress?: (ev: React.SyntheticEvent) => void;
  onKeyDown?: (ev: React.SyntheticEvent) => void;
}

// TODO: Fix this any type
const InputBaseStyled = styled.input`
  font: inherit;
  width: 100%;
  color: currentColor;
  border: 0;
  margin: 0;
  display: block;
  min-width: 0;
  box-sizing: content-box;
  background: none;
  -webkit-tap-highlight-color: transparent;
  padding: 7px 10px;
  border-radius: 3px;

  &:focus {
    outline: 0;
  }
`;

class InputBase extends React.PureComponent<IInputBaseProps> {
  static defaultProps = {
    autoComplete: false,
    autoFocus: false,
    disabled: false,
    error: false,
    readOnly: false,
    required: false,
    type: 'text',
  };

  render() {
    const {
      autoComplete,
      autoFocus,
      component,
      defaultValue,
      disabled,
      error,
      id,
      name,
      placeholder,
      readOnly,
      required,
      rows,
      type,
      value,
      className,
      ...other
    } = this.props;

    let inputComponent = component;
    let textareaProps: { [key: string]: string | number } = {};

    if (rows) {
      inputComponent = 'textarea';
      textareaProps.rows = rows;
    }

    return (
      <InputBaseStyled
        aria-invalid={error}
        as={inputComponent}
        autoComplete={
          autoComplete !== undefined && autoComplete ? 'true' : 'off'
        }
        autoFocus={autoFocus}
        className={className}
        defaultValue={defaultValue}
        disabled={disabled}
        id={id}
        name={name}
        placeholder={placeholder}
        readOnly={readOnly}
        required={required}
        type={type}
        value={value}
        {...textareaProps}
        {...other}
      />
    );
  }
}

export { InputBase, InputBaseStyled, IInputBaseProps };
