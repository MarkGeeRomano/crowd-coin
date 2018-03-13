import React from 'react';
import { Fade } from 'react-reveal';

const whichHome = (MyComponent) => (props) => (
    props.path == '/' ? <Fade><MyComponent {...props}/></Fade> : <MyComponent {...props}/>
);

export default whichHome;