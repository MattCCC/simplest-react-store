import { Context, PropsWithChildren, FC } from 'react';

export type Funct<T, TT> = (prevState: T, payload: TT) => any;

export interface Mutations<S> {
  [name: string]: (state: S, ...args: any) => Partial<S>;
}

export type Payload<M> = M extends (state: any, ...args: infer P) => any
  ? P
  : never;

export type Actions<M> = {
  [name in keyof M]: (...args: Payload<M[name]>) => void;
};

export type StoreContext<S, A> = Context<Array<S | Actions<A>>>;

export interface Store<S, M> {
  Provider: FC<PropsWithChildren<Record<string, unknown>>>;
  useStore: () => [S, Actions<M>];
  useStoreProp: <K extends keyof S>(
    prop: K
  ) => [S[K], Actions<M>];
}

export type ValueOf<
  ObjectType,
  ValueType extends keyof ObjectType = keyof ObjectType
> = ObjectType[ValueType];
