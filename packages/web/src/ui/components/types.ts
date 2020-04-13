import React from 'react';

/**
 * All standard components exposed by `material-ui` are `StyledComponents` with
 * certain `classes`, on which one can also set a top-level `className` and inline
 * `style`.
 */
export type StandardProps<C> = {
  className?: string;
  ref?: C extends { ref?: infer RefType } ? RefType : React.Ref<unknown>;
  style?: React.CSSProperties;
};

export interface OverridableTypeMap {
  props: {};
  defaultComponent: React.ElementType;
}

export interface StyledComponentProps {
  /**
   * Override or extend the styles applied to the component.
   */
  // classes?: Partial<ClassNameMap<ClassKey>>;
  innerRef?: React.Ref<any>;
}

export interface OverridableTypeMap {
  props: {};
  defaultComponent: React.ElementType;
  // classKey: string;
}

/**
 * Props that are valid for material-ui components.
 */
export interface CommonProps<M extends OverridableTypeMap>
  extends StyledComponentProps {
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Props defined on the component (+ common material-ui props).
 */
// prettier-ignore
export type BaseProps<M extends OverridableTypeMap> =
  & M['props']
  & CommonProps<M>;

/**
 * Props of the component if `component={Component}` is used.
 */
// prettier-ignore
export type OverrideProps<
  M extends OverridableTypeMap,
  C extends React.ElementType
> = (
  & BaseProps<M>
  & Omit<React.ComponentPropsWithRef<C>, keyof CommonProps<M>>
);

/**
 * Props if `component={Component}` is NOT used.
 */
// prettier-ignore
export type DefaultComponentProps<M extends OverridableTypeMap> =
  & BaseProps<M>
  & Omit<React.ComponentPropsWithRef<M['defaultComponent']>, keyof BaseProps<M>>;

/**
 * A component whose root component can be controlled via a `component` prop.
 *
 * Adjusts valid props based on the type of `component`.
 */
export interface OverridableComponent<M extends OverridableTypeMap> {
  <C extends React.ElementType>(
    props: { component: C } & OverrideProps<M, C>
  ): JSX.Element;
  (props: DefaultComponentProps<M>): JSX.Element;
}
