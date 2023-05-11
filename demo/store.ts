import { createStore } from '../src/store';

const initialState = {
    isHelloShown: false,
    helloText: "",
    user: {
        name: "",
        age: 0,
    },
};

export type State = typeof initialState;

const actions = {
  showHello: (state: State, toggle: boolean) => (state.isHelloShown = toggle),

  setHelloText: (state: State, value: string) => (state.helloText = value),

  setUser(state: State, newUserData: Partial<State['user']>) {
    // In case of objects it works like a standard reducer
    return { user: { ...state.user, ...newUserData } };
  },
};

export const { useStore, useStoreProp, Provider } = createStore(
    initialState,
    actions
);
