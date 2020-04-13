import React from 'react';
import styled from 'styled-components';

interface FormLabelProps {
  children: React.ReactNode;
  className?: string;
  component?: React.ReactNode;
  disabled?: boolean;
  error?: boolean;
  filled?: boolean;
  focused?: boolean;
  required?: boolean;
}

const LabelStyled = styled.label`
  line-height: 1;
  padding: 0;
  font-size: 1em;
  color: rgba(0, 0, 0, 0.54);
`;

// TODO: Add the FormControl context into this business ;)
const FormLabel = React.forwardRef<any, FormLabelProps>(function FormLabel(
  props,
  ref
) {
  const {
    children,
    className,
    component: Component = LabelStyled,
    disabled,
    error,
    filled,
    focused,
    required,
    ...rest
  } = props;

  return (
    // @ts-ignore
    <Component className={className} ref={ref} {...rest}>
      {children}
      {required && <span>&thinsp;{'*'}</span>}
    </Component>
  );
});

export default FormLabel;
