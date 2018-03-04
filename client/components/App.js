import React, { Component } from 'react';
import { Route, Switch, Redirect, Link, BrowserRouter, withRouter, Router } from 'react-router-dom';

import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';

// import Home from './Home';
// import Header from './Header';
// import Campaign from './Campaign';
import NewCampaign from './NewCampaign';
// import Requests from './Requests';
import NewRequest from './NewRequest';

import Home from './Home2'
import Header from './Header2'
import Campaign from './Campaign2'
import Requests from './Requests2';

class App extends Component {
    state = { campaigns: [] };

    async componentDidMount() {
        this.getCampaigns();
    };

    async getCampaigns() {
        const campaigns = await factory.methods.getDeployedCampaigns().call();
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
                        render={() => <Home {...this.props} campaigns={this.state.campaigns} />}
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
                            web3
                        }} />}
                    />
                    <Route
                        exact
                        path="/campaigns/:id/requests"
                        render={({ match: { params } }) => <Requests {...{
                            ...this.props,
                            ...params,
                            web3
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
                    <Route render={()=><h3>404 nothing here</h3>}/>
                </Switch>
            </div>
        );
    };
};

export default withRouter(App);