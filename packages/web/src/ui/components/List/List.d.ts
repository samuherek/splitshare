import { OverridableComponent, OverrideProps } from '../types';

declare const List: OverridableComponent<ListTypeMap>;

export interface ListTypeMap<P = {}, D extends React.ElementType = 'ul'> {
  props: P & {};
  defaultComponent: D;
}

export type ListProps<
  D extends React.ElementType = ListTypeMap['defaultComponent'],
  P = {
    component?: any;
  }
> = OverrideProps<ListTypeMap<P, D>, D>;
