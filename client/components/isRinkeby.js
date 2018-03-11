import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

const isRinkeby = (MyComponent) => (props) => {
    // console.log(`component:`,component)X
    console.log('props:',props)
    return props.rinkeby ? <MyComponent {...props}/> : <Redirect to='/rinkeby'/>
    // return <MyComponent {...props}/>;
};

export default isRinkeby;