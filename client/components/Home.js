import React, { Component } from 'react';
import factory from '../ethereum/factory';

class Home extends Component {
    constructor(){
        super()
    };

    async componentDidMount() {
        const campaigns = await factory.methods.getDeployedCampaigns().call();
        this.props.setContracts(campaigns)
    };

    render() {
        return <h1>{this.props.contracts[0]}</h1>;
    };
};

export default Home;