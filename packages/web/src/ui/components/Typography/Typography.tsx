import clsx from 'clsx';
import React from 'react';
import { H1, H2, H3, H4, H5, Paragraph, TextBase } from './styles';

type HTMLTypes = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';

type TypographyVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'body'
  | 'subtitle'
  | 'eyebrow';

export type Props = {
  children?: any;
  component?: HTMLTypes;
  variant?: TypographyVariant;
  lead?: boolean;
  size?: 'small' | 'medium' | 'large';
  className?: string;
  title?: string;
  id?: string; // Comment: this is for accessibility reasosn
};

export const classes = {
  root: 'Typography',
  h1: 'H1',
  h2: 'H2',
  h3: 'H3',
  h4: 'H4',
  h5: 'H5',
  body: 'Body',
  eyebrow: 'Eyebrow',
};

const themedComponent = {
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  body: Paragraph,
};

const Typography = React.forwardRef<Props, any>(function Typography(
  props,
  ref
) {
  const {
    capitalize = false,
    className,
    component,
    variant,
    // size = "medium",
    // lead = false,
    withEllipsis = true,
    ...rest
  } = props;

  // @ts-ignore
  const ThemedComponent = themedComponent[variant] || TextBase;

  return (
    <ThemedComponent
      as={component}
      capitalize={capitalize}
      withEllipsis={withEllipsis}
      className={clsx(className, classes.root, {
        [classes.h1]: variant === 'h1',
        [classes.h2]: variant === 'h2',
        [classes.h3]: variant === 'h3',
        [classes.h4]: variant === 'h4',
        [classes.h5]: variant === 'h5',
        [classes.body]: variant === 'paragraph',
      })}
      {...rest}
    />
  );
});

export default Typography;
