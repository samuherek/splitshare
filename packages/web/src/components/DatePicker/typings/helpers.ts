export type ExtendUI<C, Removals extends keyof C = never> = Omit<C, Removals>;

export type MakeOptional<T, K extends keyof T> = {
  [P in K]?: T[P] | undefined;
} &
  Omit<T, K>;
