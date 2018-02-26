import React, { Component } from 'react';
import { Route, Switch, Redirect, Link, BrowserRouter, withRouter, Router } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/actionCreators';

import factory from '../ethereum/factory';
import web3 from '../ethereum/web3';

import { Container } from 'semantic-ui-react';
import Home from './Home';
import Header from './Header';
import Campaign from './Campaign';
import NewCampaign from './NewCampaign';

class App extends Component {

    async componentDidMount() {
        const campaigns = await factory.methods.getDeployedCampaigns().call();
        this.props.setCampaigns(campaigns);
    };

    render() {
        return (
            <Container>
                <Header />
                <Switch>
                    <Route
                        exact
                        path="/"
                        render={() => <Home {...this.props} />}
                    />
                    <Route
                        path="/new-campaign"
                        render={(history) => <NewCampaign {...{ ...this.props, ...history, factory, web3 }} />}
                    />
                    <Route
                        exact
                        path="/campaigns/:id"
                        render={({ match: { params } }) => <Campaign {...{ ...this.props, ...params, web3 }} />}
                    />
                    <Route
                        path="/campaigns/:id/test"
                        render={({ match: { params } }) => <p>{params.id}</p>}
                    />
                </Switch>
            </Container>
        );
    };
};

function mapStateToProps(state) {
    return {
        campaigns: state.campaigns,
        factory
    };
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));