import { useEffect } from 'react';
import { useStoreProp } from './store';
import React from 'react';

export default function MyComponent() {
  const [helloText, dispatch] = useStoreProp('helloText');

  useEffect(() => {
    dispatch.setHelloText('Example text');
  }, [dispatch]);

  return <div>{helloText}</div>;
}
