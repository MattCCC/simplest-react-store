import { set, createStore, mergeState } from '../src/store';

const initialState = {
    isHelloShown: false,
    helloText: "",
    helloObject: {
        text: "",
        num: 0,
    },
};

export type State = typeof initialState;

const actions = {
    showHello: set<State, boolean>("isHelloShown"),

    setHelloText: set<State, string>("helloText"),

    setHelloObject(
        prevState: State,
        helloObject: Partial<State["helloObject"]>
    ) {
        return mergeState<State>(
          "helloObject",
          initialState,
          prevState,
          helloObject,
        )
    },
};

export const { useStore, useStoreProp, Provider } = createStore(
    initialState,
    actions
);
