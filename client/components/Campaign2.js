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
            mincontribution: '0',
            balance: '0',
            requestsCount: '0',
            approversCount: '0',
            manager: null,
            kampaign: null
        };
    };

    async componentDidMount() {
        // this.getSummary()
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
        const { kampaign } = this.state;

        return (
            <div className={styles.container}>
                <div className={styles.summaryContainer}>
                    <h2>Campaign Summary</h2>
                    <div className={styles.cardsContainer}>
                        {this.makeCards()}
                    </div>
                </div>
                <ContributeForm />
            </div>
        );
    };

    async getSummary() {
        // const kampaign = await campaignGetter(this.props.id);
        // const summary = await kampaign.methods.getSummary().call();

        // this.setState({
        //     mincontribution: summary[0],
        //     balance: summary[1],
        //     requestsCount: summary[2],
        //     approversCount: summary[3],
        //     manager: summary[4],
        //     kampaign
        // });
    };


    makeContent() {
        return [
            {
                title: 'campaign description',
                value: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nec eros dui. Nullam porta elit ex, ut aliquet est consequat ac. Quisque metus nibh, efficitur non volutpat commodo, elementum eu turpis. Nulla placerat cursus ligula ac fermentum. Donec eget pharetra nunc. Quisque volutpat, arcu ac iaculis tincidunt, nulla libero feugiat felis, quis tristique tortor neque eu orci. Proin sed eros sagittis, laoreet ex et, tincidunt turpis. ',
                description: '',
                isDesc: true
            },
            {
                title: 'address of manager',
                value: '0x014eB487192Ed3f61b3a449a71a9493825E44394',
                description: "The creator of this campaign. They're able to create and finalize requests for campaign",
            },
            {
                title: 'campaign balance',
                value: web3.utils.fromWei(web3.utils.toWei('10.4'), 'ether') + '(ETH)',
                description: 'The amount of ether this campaign has',
            },
            {
                title: 'number of requests',
                value: <Link to={`/campaigns/${this.props.id}/requests`}>3</Link>,
                description: 'The number of open requests this campaign has',
            },
            {
                title: 'number of approvers',
                value: '36',
                description: 'The number of donators with request voting rights',
            },
            {
                title: 'Min. contribution for voting rights',
                value: '10,000' + '(WEI)',
                description: 'The amount needed to contribute to gain voting rights',
            }
        ]
    };

    makeCards2() {
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