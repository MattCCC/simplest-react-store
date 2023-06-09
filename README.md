# Simplest React Store

[npm-url]: https://npmjs.org/package/simplest-react-store
[npm-image]: http://img.shields.io/npm/v/simplest-react-store.svg

[![NPM version][npm-image]][npm-url] [![Blazing Fast](https://badgen.now.sh/badge/speed/blazing%20%F0%9F%94%A5/green)](https://github.com/MattCCC/simplest-react-store) [![Code Coverage](https://badgen.now.sh/badge/coverage/100/green)](https://github.com/MattCCC/simplest-react-store) [![npm downloads](https://img.shields.io/npm/dm/simplest-react-store.svg?style=flat-square)](http://npm-stat.com/charts.html?package=simplest-react-store) [![install size](https://packagephobia.now.sh/badge?p=simplest-react-store)](https://packagephobia.now.sh/result?p=simplest-react-store)

Simplest react store that does the job.

This package was originally written for fun some years ago.

Lightweight and easy-to-use state management solution for React applications. It provides a simple API for creating and managing stores, making state management more approachable and less cumbersome. With this package, developers can quickly set up and utilize state management in their React projects without the need for complex setups or extensive boilerplate code.

The key features of Simplest-React-Store include:

1. <b>Minimalist Approach</b>: The package embraces simplicity and aims to provide a straightforward solution for state management in React applications.

2. <b>Small Footprint</b>: Simplest-React-Store is designed to be lightweight and has a minimal impact on bundle size, ensuring optimal performance for applications.

3. <b>Intuitive API</b>: The API is intuitive and easy to understand, making it accessible for developers of all skill levels.

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

### 1. Define your store

```typescript
// store.ts
import { createStore } from 'simplest-react-store';

// Define the initial state of the store. This includes the properties isHelloShown, helloText, and user with their initial values.
const initialState = {
    isHelloShown: false,
    helloText: "",
    user: {
        name: "Matt",
        age: 40,
    },
};

export type State = typeof initialState;

// Define the actions that can be performed on the store.
// These actions are functions that receive the current state and
// any necessary parameters, and they update the state accordingly.
const actions = {
    showHello: (state: State, toggle: boolean) => (state.isHelloShown = toggle),

    setHelloText: (state: State, value: string) => (state.helloText = value),

    setUser(
        state: State,
        newUserData: Partial<State["user"]>
    ) {
        // For objects, it works similar to a standard reducer and is particularly useful for handling nested objects

        // Update the user state by merging newUserData with the current user object
        return { user: { ...state.user, ...newUserData } };
    },
};

// Create the store by calling the createStore function and passing the initial state and actions.
export const { useStore, useStoreProp, Provider } = createStore(
    initialState,
    actions
);
```

### 2. Import Provider in your main app file

Wrap your React application with the Provider component provided by the store. This makes the store available to all components in the application.

```typescript
// _app.tsx
import { Provider as MyStoreProvider } from "./store";

function App({ Component, pageProps }: AppProps) {
    return (
        <MyStoreProvider>
            /* Your app code */
        </MyStoreProvider>
    );
}
```

### 3. Use state anywhere in your components

Access the store's state and actions in your components using the useStore and useStoreProp hooks.

```typescript
// MyComponent.tsx
import { useEffect } from 'react';
import { useStoreProp } from "store";

export default function MyComponent() {
    const [helloText] = useStoreProp("helloText");
    const [user] = useStoreProp("user");
    const [showHello, dispatch] = useStoreProp("isHelloShown");

    useEffect(() => {
        // You can use same dispatch for all actions as it is the same store
        dispatch.setUser({name: "David", age: 19});
        dispatch.setHelloText("Hello");
        dispatch.showHello(true);
    }, [dispatch]);

    return (
        <div>
            {showHello && (
                <span>
                   {helloText} {user.name}
                </span>
            )}
        </div>
    );
}

```

That's it! Now you can use the state properties and actions from the store in your components to manage and update the state of your application. Remember to import the necessary functions and components from the store.ts file where needed.

## Support and collaboration

If you have any idea for an improvement, please file an issue. Feel free to make a PR if you are willing to collaborate on the project. Thank you :)
