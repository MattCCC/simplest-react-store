import React from 'react';
import ReactDOM from 'react-dom';

import { Provider as MyStoreProvider } from './store';
import MyComponent from './MyComponent';

function App() {
  return (
    <MyStoreProvider>
      <MyComponent />
    </MyStoreProvider>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
