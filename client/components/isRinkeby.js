import React from 'react';
import { Redirect } from 'react-router-dom';

const isRinkeby = (MyComponent) => (props) => (
  props.rinkeby ? <MyComponent {...props} /> : <Redirect to='/rinkeby' />
);

export default isRinkeby;