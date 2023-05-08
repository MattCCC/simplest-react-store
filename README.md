# Simplest React Store

[npm-url]: https://npmjs.org/package/simplest-react-store
[npm-image]: http://img.shields.io/npm/v/simplest-react-store.svg

[![NPM version][npm-image]][npm-url] [![Blazing Fast](https://badgen.now.sh/badge/speed/blazing%20%F0%9F%94%A5/green)](https://github.com/MattCCC/simplest-react-store) [![Code Coverage](https://badgen.now.sh/badge/coverage/94.53/blue)](https://github.com/MattCCC/simplest-react-store) [![npm downloads](https://img.shields.io/npm/dm/simplest-react-store.svg?style=flat-square)](http://npm-stat.com/charts.html?package=simplest-react-store) [![install size](https://packagephobia.now.sh/badge?p=simplest-react-store)](https://packagephobia.now.sh/result?p=simplest-react-store)

Simplest react store that does the job.

This package was originally written for fun some years ago.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Support and collaboration](#support-and-collaboration)

## Installation

[![NPM](https://nodei.co/npm/simplest-react-store.png)](https://npmjs.org/package/simplest-react-store)

Using npm:

```bash
npm install simplest-react-store
```

Using yarn:

```bash
yarn add simplest-react-store
```

## Usage

```typescript
// store.ts
import { set, createStore, mergeState } from 'simplest-react-store';

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

// _app.tsx
import { Provider as MyStoreProvider } from "./store";

function App({ Component, pageProps }: AppProps) {
    return (
        <MyStoreProvider>
            /* Your app code */
        </MyStoreProvider>
    );
}

// MyComponent.tsx
import { useStoreProp } from "store";

export default function MyComponent() {
const [helloText, dispatch] = useStoreProp("helloText");

  useEffect(() => {
    dispatch.setHelloText("Example text");
  }, [dispatch]);

  return (
    <div>{helloText}</div>
  );
}

```

## Support and collaboration

If you have any idea for an improvement, please file an issue. Feel free to make a PR if you are willing to collaborate on the project. Thank you :)
