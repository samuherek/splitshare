import { ReactNode, CSSProperties } from 'react';

export interface BaseProps {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export interface UICoreBaseProps extends BaseProps {
  component?: ReactNode;
}
