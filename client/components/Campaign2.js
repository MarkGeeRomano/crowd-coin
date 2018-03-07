import React, { Component } from 'react';
import { Card, Grid, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import campaignGetter from '../../ethereum/Campaign';
import web3 from '../../ethereum/web3';

import styles from '../styles/campaign.css';

import ContributeForm from './ContributeForm2';

class Campaign extends Component {
    constructor() {
        super();

        this.state = {
            minContribution: '0',
            balance: '0',
            requestsCount: '0',
            approversCount: '0',
            manager: '',
            name: '',
            description: '',
            campaign: ''
        };
    };

    async componentDidMount() {
        const campaign = await campaignGetter(this.props.id);
        const campaignMeta = await campaign.methods.getSummary().call();
        this.setState({
            minContribution: campaignMeta[0],
            balance: campaignMeta[1],
            requestsCount: campaignMeta[2],
            approversCount: campaignMeta[3],
            manager: campaignMeta[4],
            name: campaignMeta[5],
            description: campaignMeta[6],
            campaign
        });
    };

    makeCards() {
        return this.makeContent().map(item =>
            <div className={styles.card} key={item.title}>
                <div className={styles.title}>{item.title.toUpperCase()}</div>
                <div
                    style={item.isDesc ? { fontSize: '12px' } : null}
                    className={styles.value}>
                    {item.value}
                </div>
                <div className={styles.description}>{item.description}</div>
            </div>
        );
    };

    render() {
        return (
            <div className={styles.container}>
                <div className={styles.donateContainer}>
                    <ContributeForm
                        minContribution={this.state.minContribution}
                        campaign={this.state.campaign}
                        web3={this.props.web3}
                    />
                </div>
                <div className={styles.summaryContainer}>
                    <h2>Campaign Summary</h2>
                    <div className={styles.cardsContainer}>
                        {this.makeCards()}
                    </div>
                </div>
            </div>
        );
    };

    async getSummary() {
        // const kampaign = await campaignGetter(this.props.id);
        // const summary = await kampaign.methods.getSummary().call();

        // this.setState({
        //     minContribution: summary[0],
        //     balance: summary[1],
        //     requestsCount: summary[2],
        //     approversCount: summary[3],
        //     manager: summary[4],
        //     kampaign
        // });
    };


    makeContent() {
        const {
            description,
            manager,
            balance,
            requestsCount,
            approversCount,
            minContribution
        } = this.state;

        return [
            {
                title: 'campaign description',
                value: description,
                description: '',
                isDesc: true
            },
            {
                title: 'address of manager',
                value: manager,
                description: "The creator of this campaign. They're able to create and finalize requests for campaign",
            },
            {
                title: 'campaign balance',
                value: Math.round(web3.utils.fromWei(balance, 'ether') * 1000) + ' (ETH)',
                description: 'The amount of ether this campaign has',
            },
            {
                title: 'number of requests',
                value: <Link to={`/campaigns/${this.props.id}/requests`}>{requestsCount}</Link>,
                description: 'The number of open requests this campaign has',
            },
            {
                title: 'number of approvers',
                value: approversCount,
                description: 'The number of donators with request voting rights',
            },
            {
                title: 'Min. contribution for voting rights',
                value: minContribution + ' (WEI)',
                description: 'The amount needed to contribute to gain voting rights',
            }
        ]
    };
};

export default Campaign;