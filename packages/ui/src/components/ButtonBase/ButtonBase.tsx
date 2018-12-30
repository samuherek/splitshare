// @flow
import * as React from 'react';
import styled, { css } from '../../styles/styled-components';

export interface IBaseButtonProps {
  children: Node;
  onClick?: any;
  component: React.ComponentType | 'button' | 'a';
  to?: string;
  disabled?: boolean;
  tabIndex?: string | number;
  href?: string;
  type?: string;
  withNewTab?: boolean;
  className?: string;
}

export interface IButtonHTMLProps {
  className?: string;
  disabled?: boolean;
  type?: string;
  role?: string;
}

// TODO: Fix the ts types
const ButtonBaseStyled: any = styled.button`
  color: inherit;
  cursor: pointer;
  margin: 0;
  border: 0;
  display: inline-flex;
  outline: none;
  position: relative;
  user-select: none;
  align-items: center;
  border-radius: 0;
  vertical-align: middle;
  justify-content: center;
  text-decoration: none;
  background-color: transparent;
  font: inherit;
  padding: 0;

  &:disabled {
    cursor: default;
    pointer-events: none;
    box-shadow: none;
  }

  &:active {
    transform: translateY(1px);
  }

  /* This is for html tags which don't support ":disabled" for the time being*/
  ${({ disabled }) => {
    if (disabled) {
      return css`
        cursor: default;
        pointer-events: none;
        box-shadow: none;
      `;
    } else {
      return null;
    }
  }} /* &:focus {
    outline: 0;
  } */
`;

class Button extends React.PureComponent<IBaseButtonProps, void> {
  static defaultProps = {
    tabIndex: '0',
    component: 'button',
    to: '',
  };

  handleClick = (ev: React.SyntheticEvent<HTMLButtonElement>) => {
    const { onClick } = this.props;
    ev.currentTarget.blur();

    if (typeof onClick === 'function') {
      onClick(ev);
    }
  };

  render() {
    const {
      children,
      component,
      tabIndex,
      className,
      disabled,
      to,
      ...other
    } = this.props;

    let ComponentProp = component;

    const buttonProps: IButtonHTMLProps = {};
    buttonProps.className = className;
    buttonProps.disabled = disabled;

    // Sometimes it's helpful to use dataset props. Thus we need to make sure we apply them to the button
    Object.keys(other).forEach(key => {
      if (key.startsWith('data-')) {
        buttonProps[key] = other[key];
      }
    });

    if (ComponentProp === 'button' && other.href) {
      ComponentProp = 'a';
    }

    if (ComponentProp === 'button') {
      buttonProps.type = other.type || 'button';
      buttonProps.disabled = disabled;
    } else {
      buttonProps.role = 'button';
    }

    return (
      <ButtonBaseStyled
        onClick={this.handleClick}
        as={component}
        tabIndex={disabled ? -1 : Number(tabIndex)}
        to={other.href || to}
        href={component === 'a' && other.href ? other.href : null}
        target={other && other.withNewTab ? '_blank' : null}
        {...buttonProps}
      >
        {children}
      </ButtonBaseStyled>
    );
  }
}

export default Button;
