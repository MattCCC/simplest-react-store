import React from 'react';
import { useEffect } from 'react';
import { useStoreProp } from './store';

export default function MyComponent() {
  const [helloText] = useStoreProp('helloText');
  const [user] = useStoreProp('user');
  const [showHello, dispatch] = useStoreProp('isHelloShown');

  useEffect(() => {
    // You can use same dispatch for all actions as it is the same store
    dispatch.setUser({ name: 'David', age: 19 });
    dispatch.setHelloText('Hello');
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
