import { useReducer, useMemo, FC, PropsWithChildren } from 'react';

import { createContext, useContextSelector } from 'use-context-selector';
import { Actions, Funct, Mutations, Payload, Store, ValueOf } from './types/store';

/**
 * Toggle state boolean
 * @param {string} type      State key
 * @returns {object}        Modified state
 */
export function set<T, T1, T2 = T>(type: keyof T): Funct<T2, T1> {
  return (prevState, payload): unknown => ({
    ...prevState,
    [type]: payload,
  });
}

function getEmptyActions<S, M extends Mutations<S>>(mutations: M): Actions<M> {
  const actions: Actions<M> = Object.assign({}, mutations);

  Object.keys(mutations).forEach((name: keyof M) => {
    actions[name] = (): void => {};
  });

  return actions;
}

/**
 * Create a simple store instance with the initial state and reducer
 * @param initialState      Initial store state
 * @param reducer           Reducer to mutate state
 * @returns {Store}         Store instance with `Provider` component and `useStore` hook
 */
export function createStore<S, M extends Mutations<S>>(
  initialState: S,
  mutations: M
): Store<S, M> {
  const defaultContext: [S, Actions<M>] = [
    initialState,
    getEmptyActions<S, M>(mutations),
  ];
  const context = createContext(defaultContext);
  let actions: Actions<M> | null = null;

  function reducer(
    prevState: S,
    action: {
      type: keyof M;
      payload: Payload<M[keyof M]>;
    }
  ): S {
    return {
      ...prevState,
      ...mutations[action.type](prevState, ...(action.payload as unknown[])),
    };
  }

  function Provider({ children }: PropsWithChildren<Record<string, unknown>>) {
    const [state, dispatch] = useReducer(reducer, initialState);

    actions = useMemo(() => {
      const result: Actions<M> = Object.assign({}, mutations);

      Object.keys(mutations).forEach((name: keyof M) => {
        result[name] = (...args): void => {
          dispatch({ type: name, payload: args });
        };
      });

      return result;
    }, [dispatch]);

    const v = [state, actions] as [S, Actions<M>];

    return <context.Provider value={v}>{children}</context.Provider>;
  }

  function useStore() {
    return useContextSelector(context, (state) => state);
  }

  function useStoreProp<K extends keyof S>(prop: K): [S[K], Actions<M>] {
    const value = useContextSelector(context, (state) => state[0][prop]);

    return [value, actions];
  }

  return { Provider, useStore, useStoreProp };
}

/**
 * A custom hook to combine multiple stores and returns a single Provider.
 * @param stores List of stores
 * @returns A single Provider component that provides all the stores
 */
export function useStoreProvider(
  ...stores: Array<Store<unknown, unknown>>
): FC<PropsWithChildren<Record<string, unknown>>> {
  function Provider({ children }: PropsWithChildren<Record<string, unknown>>) {
    let wrapped = children;

    stores.forEach(({ Provider: ProviderWrapper }) => {
      wrapped = <ProviderWrapper>{wrapped}</ProviderWrapper>;
    });

    return <>{wrapped}</>;
  }

  return Provider;
}

/**
 * Merge State while preserving initial state's sub-objects
 * @param key State property
 * @param initialState Initial state
 * @param prevState Previous state
 * @param obj New object to be updated
 * @returns Merged object
 */
export function mergeState<State = { [x: string]: unknown }>(
  key: keyof State,
  initialState: State,
  prevState: State,
  obj: Partial<ValueOf<State, typeof key>> | undefined
): State {
  const newObj = obj || prevState[key] || initialState[key];

  return { ...prevState, ...{ [key]: newObj } };
}
