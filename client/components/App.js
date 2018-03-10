import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';

import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import campaignGetter from '../../ethereum/Campaign';

import Home from './Home'
import Header from './Header'
import Campaign from './Campaign'
import Requests from './Requests';

class App extends Component {
    state = { campaigns: [] };

    async componentDidMount() {
        this.getCampaigns();
    };

    async getCampaigns() {
        const addresses = await factory.methods.getDeployedCampaigns().call();
        const campaigns = [];
        for (let i = 0; i < addresses.length; i++) {
            const campaign = campaignGetter(addresses[i]);
            const campaignDetails = await campaign.methods.getSummary().call();
            campaignDetails['7'] = addresses[i]
            campaigns.push(campaignDetails);
        };

        this.setState({ campaigns });
    };

    render() {
        return (
            <div>
                <Header />
                <Switch>
                    <Route
                        exact
                        path="/"
                        render={() => <Home
                            {...this.props}
                            campaigns={this.state.campaigns}
                            factory={factory}
                            web3={web3}
                        />}
                    />
                    <Route
                        path="/new-campaign"
                        render={(history) => <NewCampaign {...{
                            ...this.props,
                            factory,
                            web3,
                            getCampaigns: this.getCampaigns.bind(this),
                            campaigns: this.state.campaigns
                        }} />}
                    />
                    <Route
                        exact
                        path="/campaigns/:id"
                        render={({ match: { params } }) => <Campaign {...{
                            ...this.props,
                            ...params,
                            web3,
                        }} />}
                    />
                    <Route
                        exact
                        path="/campaigns/:id/requests"
                        render={({ match: { params } }) => <Requests {...{
                            ...this.props,
                            ...params,
                            web3,
                            campaignGetter
                        }} />}
                    />
                    <Route
                        path="/campaigns/:id/requests/new"
                        render={({ match: { params } }) => <NewRequest {...{
                            ...this.props,
                            ...params,
                            web3
                        }} />}
                    />
                    <Route render={() => <h3>404 nothing here</h3>} />
                </Switch>
            </div>
        );
    };
};

export default withRouter(App);