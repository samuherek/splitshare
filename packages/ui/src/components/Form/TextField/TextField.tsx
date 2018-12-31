// @flow
import * as React from 'react';
import styled from '../../../styles/styled-components';

import { Input, IInputProps } from '../Input';
import { FieldLabel } from '../FieldLabel';

interface IControlWrapStyled extends IInputProps {
  fullWidth?: boolean;
}

interface ITextFiledProps extends IControlWrapStyled {
  // TODO: make a type for the input label props
  InputLabelProps?: { [key: string]: string };
  label?: string;
  margin?: string;
}

interface State {
  focused: boolean;
}

const ControlWrapStyled = styled.div<IControlWrapStyled>`
  display: inline-flex;
  position: relative;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
`;

class TextField extends React.PureComponent<ITextFiledProps, State> {
  state = {
    focused: false,
  };

  handleFocus = () => {
    this.setState({ focused: true });
  };

  handleBlur = () => {
    this.setState({ focused: false });
  };

  render() {
    const {
      defaultValue,
      disabled,
      error,
      fullWidth,
      id,
      InputLabelProps,
      label,
      margin,
      required,
      value,
      variant,
      ...other
    } = this.props;
    const { focused } = this.state;

    const showPlaceholder = InputLabelProps ? !!InputLabelProps.shrink : !label;

    return (
      <ControlWrapStyled fullWidth={fullWidth}>
        {label ? (
          <FieldLabel
            error={!!error}
            focused={focused}
            hasValue={!!defaultValue || !!value}
            text={label}
            {...InputLabelProps}
          />
        ) : null}
        <Input
          defaultValue={defaultValue}
          disabled={disabled}
          error={error}
          focused={focused}
          id={id}
          margin={margin}
          onBlur={this.handleBlur}
          onFocus={this.handleFocus}
          required={required}
          showPlaceholder={showPlaceholder}
          value={value}
          variant={variant}
          {...other}
        />
      </ControlWrapStyled>
    );
  }
}

export { TextField, ITextFiledProps };
