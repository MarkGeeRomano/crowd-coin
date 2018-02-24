import React, { Component } from 'react';

class Home extends Component {

    render() {
        return <h1>{this.props.contracts[0]}</h1>;
    };
};

export default Home;