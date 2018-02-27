import React, { Component } from 'react';
import { Card, Grid, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import campaignGetter from '../ethereum/Campaign';
import web3 from '../ethereum/web3';

import ContributeForm from './ContributeForm';

class Campaign extends Component {
    constructor() {
        super();

        this.state = {
            mincontribution: '0',
            balance: '0',
            requestsCount: '0',
            approversCount: '0',
            manager: null,
            kampaign: null
        };
    };

    async componentDidMount() {
        this.getSummary()
    };

    render() {
        const { kampaign } = this.state;

        return (
            <div>
                <h2>Campaign Summary</h2>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={10}>
                            <Card.Group items={this.makeCards()} />
                        </Grid.Column>
                        <Grid.Column width={6}>
                            <ContributeForm
                                kampaign={kampaign}
                                web3={this.props.web3}
                                getSummary={this.getSummary.bind(this)}
                            />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <Link to={`/campaigns/${this.props.id}/requests`}>
                                <Button primary>View Requests</Button>
                            </Link>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        );
    };

    async getSummary() {
        const kampaign = await campaignGetter(this.props.id);
        const summary = await kampaign.methods.getSummary().call();

        this.setState({
            mincontribution: summary[0],
            balance: summary[1],
            requestsCount: summary[2],
            approversCount: summary[3],
            manager: summary[4],
            kampaign
        });
    };

    makeCards() {
        const {
            mincontribution,
            balance,
            requestsCount,
            approversCount,
            manager,
        } = this.state;

        return [
            {
                style: { overflowWrap: 'break-word' },
                header: manager,
                meta: 'Address of manager',
                description: 'Creator of campaign. Able to create and finalize requests for campaign'
            },
            {
                style: { overflowWrap: 'break-word' },
                header: web3.utils.fromWei(balance, 'ether'),
                meta: 'Campaign balance (ether)',
                description: 'The amount of ether campaign has left to spend'
            },
            {
                style: { overflowWrap: 'break-word' },
                header: requestsCount,
                meta: 'Number of requests',
                description: 'A request attempts to draw from the campaign. Requests must be approved by contributors'
            },
            {
                style: { overflowWrap: 'break-word' },
                header: approversCount, meta: 'Number of approvers',
                description: "Number of people who donated to campaign"
            },
            {
                style: { overflowWrap: 'break-word' },
                header: mincontribution,
                meta: 'Minimum contribution (wei)',
                description: 'You must contribute atleast this much wei to become an approver'
            },
        ];
    }
};

export default Campaign;