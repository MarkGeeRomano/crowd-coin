import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';

import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import campaignGetter from '../../ethereum/Campaign';

import Home from './Home';
import Header from './Header';
import Campaign from './Campaign';
import Requests from './Requests';
import About from './About';
import Test from './Test';

class App extends Component {
    state = {
        campaigns: [],
        rinkeby: true,
        hasAddress: true
    };

    async componentDidMount() {
        if (await web3.eth.net.getNetworkType() != 'rinkeby') {
            return this.setState({ rinkeby: false });
        }
        const address = await web3.eth.getAccounts();
        const hasAddress = !!address[0];
    
    };

    async getCampaigns() {
        const address = await web3.eth.getAccounts();
        const hasAddress = !!address[0];
        const addresses = await factory.methods.getDeployedCampaigns().call();
        const campaigns = [];
        for (let i = 0; i < addresses.length; i++) {
            const campaign = campaignGetter(addresses[i]);
            const campaignDetails = await campaign.methods.getSummary().call();
            campaignDetails['7'] = addresses[i]
            campaigns.push(campaignDetails);
        };

        this.setState({ ...this.state, campaigns, hasAddress });
    };

    render() {
        return (
            <div>
                <Header />
                <Switch>
                    <Route
                        exact
                        path="/"
                        render={({match}) => <Home {...{
                            ...this.props,
                            campaigns: this.state.campaigns,
                            factory,
                            web3,
                            getCampaigns: this.getCampaigns.bind(this),
                            rinkeby: this.state.rinkeby,
                            hasAddress: this.state.hasAddress,
                            match
                        }} />}
                    />
                    <Route
                        exact
                        path="/new-campaign"
                        render={({match}) => <Home {...{
                            ...this.props,
                            campaigns: this.state.campaigns,
                            factory,
                            web3,
                            getCampaigns: this.getCampaigns.bind(this),
                            rinkeby: this.state.rinkeby,
                            hasAddress: this.state.hasAddress,
                            match
                        }} />}
                    />
                    <Route
                        exact
                        path="/campaigns/:id"
                        render={({ match: { params } }) => <Campaign {...{
                            ...this.props,
                            ...params,
                            web3,
                            rinkeby: this.state.rinkeby,
                            hasAddress: this.state.hasAddress
                        }} />}
                    />
                    <Route
                        exact
                        path="/campaigns/:id/requests"
                        render={({ match: { params } }) => <Requests {...{
                            ...this.props,
                            ...params,
                            web3,
                            campaignGetter,
                            rinkeby: this.state.rinkeby
                        }} />}
                    />
                    <Route path='/about' component={About} />
                    <Route
                        path='/rinkeby'
                        render={(history) =>
                            !this.state.rinkeby ?
                                <div style={{ margin: '50px' }}>You're not on the Rinkeby network. Please switch to view the site!</div>
                                :
                                <Redirect to='/' />
                        }
                    />
                    <Route path='/test' render={()=><Test/>}/>
                    <Route render={() => <div style={{ margin: '50px' }}>404 nothing here homie</div>} />
                </Switch>
            </div>
        );
    };
};

export default withRouter(App);